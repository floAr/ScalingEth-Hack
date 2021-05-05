use cosmwasm_std::{
    to_binary, Api, BankMsg, CanonicalAddr, Coin, CosmosMsg, Env, Extern, HandleResponse,
    HandleResult, HumanAddr, InitResponse, InitResult, Querier, QueryResult, StdError, StdResult,
    Storage, Uint128,
};

use secret_toolkit::{
    snip721::{batch_mint_nft_msg, mint_nft_msg, Metadata, Mint},
    utils::{pad_handle_result, pad_query_result},
};

use crate::msg::{
    ContractInfo, HandleAnswer, HandleMsg, InitMsg, QueryAnswer, QueryMsg, ResponseStatus::Success,
};
use crate::rand::{sha_256, Prng};
use crate::state::{load, save, Config, StoreContractInfo, ADMIN_KEY, CONFIG_KEY};
use crate::stats::Stats;

use serde_json_wasm as serde_json;

pub const BLOCK_SIZE: usize = 256;

////////////////////////////////////// Init ///////////////////////////////////////
/// Returns InitResult
///
/// Initializes the factory and creates a prng from the entropy String
///
/// # Arguments
///
/// * `deps` - mutable reference to Extern containing all the contract's external dependencies
/// * `env` - Env of contract's environment
/// * `msg` - InitMsg passed in with the instantiation message
pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: InitMsg,
) -> InitResult {
    let prng_seed: Vec<u8> = sha_256(base64::encode(msg.entropy).as_bytes()).to_vec();
    let admin = deps.api.canonical_address(&env.message.sender)?;
    let config = Config {
        minting_halt: false,
        prng_seed,
        token_contract: StoreContractInfo {
            code_hash: msg.token_contract.code_hash,
            address: deps.api.canonical_address(&msg.token_contract.address)?,
        },
    };

    save(&mut deps.storage, CONFIG_KEY, &config)?;
    save(&mut deps.storage, ADMIN_KEY, &admin)?;

    Ok(InitResponse::default())
}

///////////////////////////////////// Handle //////////////////////////////////////
/// Returns HandleResult
///
/// # Arguments
///
/// * `deps` - mutable reference to Extern containing all the contract's external dependencies
/// * `env` - Env of contract's environment
/// * `msg` - HandleMsg passed in with the execute message
pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> HandleResult {
    let response = match msg {
        HandleMsg::SetMintStatus { stop } => try_set_mint_status(deps, env, stop),
        HandleMsg::Mint {
            title,
            description,
            thumbnail,
            fullres,
        } => try_mint(deps, env, title, description, thumbnail, fullres),
        HandleMsg::ChangeAdmin { address } => try_change_admin(deps, env, address),
        HandleMsg::NewTokenContract { token_contract } => {
            try_new_card_contract(deps, env, token_contract)
        }
    };
    pad_handle_result(response, BLOCK_SIZE)
}

/// Returns HandleResult
///
/// mint a art token
///
/// # Arguments
///
/// * `deps` - mutable reference to Extern containing all the contract's external dependencies
/// * `env` - Env of contract's environment
/// * `names` - list of names for the newly minted cards
pub fn try_mint<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    title: String,
    description: String,
    thumbnail: String,
    fullres: String,
) -> HandleResult {
    let mut config: Config = load(&deps.storage, CONFIG_KEY)?;
    if config.minting_halt {
        return Err(StdError::generic_err(
            "The minter has been stopped.  No new cards can be minted",
        ));
    }
    // we want minting to be free for now
    // if env.message.sent_funds.len() != 1
    //     || env.message.sent_funds[0].amount != Uint128(1000000)
    //     || env.message.sent_funds[0].denom != *"uscrt"
    // {
    //     return Err(StdError::generic_err(
    //         "You must pay exactly 1 SCRT to buy a pack of heroes",
    //     ));
    // }
    let token_contract = config.token_contract;

    let pub_meta = Metadata {
        name: Some(title),
        description: Some(description),
        image: Some(thumbnail),
    };

    let priv_meta = Metadata {
        name: None,
        description: None,
        image: Some(fullres),
    };

    let mint = Mint {
        token_id: None,
        owner: Some(env.message.sender),
        public_metadata: Some(pub_meta),
        private_metadata: Some(priv_meta),
        memo: None,
    };
    let mut messages: Vec<CosmosMsg> = Vec::new();
    messages.push(mint_nft_msg(
        mint.token_id,
        mint.owner,
        mint.public_metadata,
        mint.private_metadata,
        mint.memo,
        None,
        BLOCK_SIZE,
        token_contract.code_hash,
        deps.api.human_address(&token_contract.address)?,
    )?);
    // this is also not needed without payment
    // let amount: Vec<Coin> = vec![Coin {
    //     denom: "uscrt".to_string(),
    //     amount: Uint128(1000000),
    // }];
    // messages.push(CosmosMsg::Bank(BankMsg::Send {
    //     from_address: env.contract.address,
    //     to_address: deps.api.human_address(&config.multi_sig)?,
    //     amount,
    // }));
    Ok(HandleResponse {
        messages,
        log: vec![],
        data: Some(to_binary(&HandleAnswer::Mint { status: Success })?),
    })
}

/// Returns HandleResult
///
/// change the admin address
///
/// # Arguments
///
/// * `deps` - mutable reference to Extern containing all the contract's external dependencies
/// * `env` - Env of contract's environment
/// * `address` - the new admin address
pub fn try_change_admin<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    address: HumanAddr,
) -> HandleResult {
    let sender_raw = deps.api.canonical_address(&env.message.sender)?;
    let admin: CanonicalAddr = load(&deps.storage, ADMIN_KEY)?;
    if admin != sender_raw {
        return Err(StdError::generic_err(
            "This is an admin command and can only be run from the admin address",
        ));
    }
    let new_admin = deps.api.canonical_address(&address)?;
    if new_admin != admin {
        save(&mut deps.storage, ADMIN_KEY, &new_admin)?;
    }
    Ok(HandleResponse {
        messages: vec![],
        log: vec![],
        data: Some(to_binary(&HandleAnswer::ChangeAdmin {
            new_admin: address,
        })?),
    })
}

/// Returns HandleResult
///
/// set the minting status
///
/// # Arguments
///
/// * `deps` - mutable reference to Extern containing all the contract's external dependencies
/// * `env` - Env of contract's environment
/// * `stop` - true if minting shold be halted
pub fn try_set_mint_status<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    stop: bool,
) -> HandleResult {
    let admin: CanonicalAddr = load(&deps.storage, ADMIN_KEY)?;
    let sender_raw = deps.api.canonical_address(&env.message.sender)?;
    if sender_raw != admin {
        return Err(StdError::generic_err(
            "This is an admin command. Admin commands can only be run from admin address",
        ));
    }
    let mut config: Config = load(&deps.storage, CONFIG_KEY)?;
    if config.minting_halt != stop {
        config.minting_halt = stop;
        save(&mut deps.storage, CONFIG_KEY, &config)?;
    }

    Ok(HandleResponse {
        messages: vec![],
        log: vec![],
        data: Some(to_binary(&HandleAnswer::SetMintStatus {
            minting_has_halted: stop,
        })?),
    })
}

/// Returns HandleResult
///
/// change the card contract
///
/// # Arguments
///
/// * `deps` - mutable reference to Extern containing all the contract's external dependencies
/// * `env` - Env of contract's environment
/// * `card_contract` - new card ContractInfo
pub fn try_new_card_contract<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    token_contract: ContractInfo,
) -> HandleResult {
    let admin: CanonicalAddr = load(&deps.storage, ADMIN_KEY)?;
    let sender_raw = deps.api.canonical_address(&env.message.sender)?;
    if sender_raw != admin {
        return Err(StdError::generic_err(
            "This is an admin command. Admin commands can only be run from admin address",
        ));
    }

    let mut config: Config = load(&deps.storage, CONFIG_KEY)?;
    let new_address_raw = deps.api.canonical_address(&token_contract.address)?;

    config.token_contract = StoreContractInfo {
        code_hash: token_contract.code_hash,
        address: new_address_raw,
    };

    save(&mut deps.storage, CONFIG_KEY, &config)?;

    Ok(HandleResponse {
        messages: vec![],
        log: vec![],
        data: Some(to_binary(&HandleAnswer::NewCardContract {
            token_contract: token_contract.address,
        })?),
    })
}

/////////////////////////////////////// Query /////////////////////////////////////
/// Returns QueryResult
///
/// # Arguments
///
/// * `deps` - reference to Extern containing all the contract's external dependencies
/// * `msg` - QueryMsg passed in with the query call
pub fn query<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>, msg: QueryMsg) -> QueryResult {
    let response = match msg {
        QueryMsg::Config {} => query_config(deps),
    };
    pad_query_result(response, BLOCK_SIZE)
}

/// Returns QueryResult displaying the contract's config
///
/// # Arguments
///
/// * `deps` - a reference to Extern containing all the contract's external dependencies
pub fn query_config<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>) -> QueryResult {
    let config: Config = load(&deps.storage, CONFIG_KEY)?;
    to_binary(&QueryAnswer::Config {
        minting_has_halted: config.minting_halt,
    })
}
