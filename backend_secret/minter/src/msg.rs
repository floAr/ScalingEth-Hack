use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::HumanAddr;

/// Instantiation message
#[derive(Serialize, Deserialize, JsonSchema)]
pub struct InitMsg {
    /// prng entropy
    pub entropy: String,
    /// card contract info
    pub token_contract: ContractInfo,
}

/// Handle messages
#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    /// mint a pack of 3 cards
    Mint {
        /// names to give the cards.  Must provide 3 names
        title: String,
        description:String,
        thumbnail:String,
        fullres:String,
    },
    /// change address with administrative power
    ChangeAdmin {
        /// address with admin authority
        address: HumanAddr,
    },
    /// halt/start minting
    SetMintStatus {
        /// true if minting should be halted
        stop: bool,
    },
    NewTokenContract {
        /// new card ContractInfo
        token_contract: ContractInfo,
    },
}

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    /// display the minter config
    Config {},
}

/// success or failure response
#[derive(Serialize, Deserialize, Debug, JsonSchema)]
pub enum ResponseStatus {
    Success,
    Failure,
}

/// Responses from handle functions
#[derive(Serialize, Deserialize, Debug, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleAnswer {
    Mint { status: ResponseStatus },
    ChangeAdmin { new_admin: HumanAddr },
    SetMintStatus { minting_has_halted: bool },
    NewCardContract { token_contract: HumanAddr },
}

/// Responses from queries
#[derive(Serialize, Deserialize, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum QueryAnswer {
    /// minter config
    Config {
        minting_has_halted: bool,
    },
}

/// code hash and address of a contract
#[derive(Serialize, Deserialize, JsonSchema, Clone, PartialEq, Debug)]
pub struct ContractInfo {
    /// contract's code hash string
    pub code_hash: String,
    /// contract's address
    pub address: HumanAddr,
}
