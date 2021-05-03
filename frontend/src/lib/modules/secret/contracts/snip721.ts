/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type HumanAddr = string;
/**
 * Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
 *
 * This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>
 */
export type Binary = string;
export type Uint128 = string;

/**
 * Instantiation message
 */
export interface InitMsg {
    /**
     * optional admin address, env.message.sender if missing
     */
    admin?: HumanAddr | null;
    /**
     * optional privacy configuration for the contract
     */
    config?: InitConfig | null;
    /**
     * entropy used for prng seed
     */
    entropy: string;
    /**
     * name of token contract
     */
    name: string;
    /**
     * optional callback message to execute after instantiation.  This will most often be used to have the token contract provide its address to a contract that instantiated it, but it could be used to execute any contract
     */
    post_init_callback?: PostInitCallback | null;
    /**
     * token contract symbol
     */
    symbol: string;

}
/**
 * This type represents optional configuration values. All values are optional and have defaults which are more private by default, but can be overridden if necessary
 */
export interface InitConfig {
    /**
     * Indicates whether burn functionality should be enabled default: False
     */
    enable_burn?: boolean | null;
    /**
     * indicates whether sealed metadata should be enabled.  If sealed metadata is enabled, the private metadata is not viewable by anyone, not even the owner, until the owner calls the Reveal function.  When Reveal is called, the sealed metadata is irreversibly moved to the public metadata (as default).  if unwrapped_metadata_is_private is set to true, it will remain as private metadata, but the owner will now be able to see it.  Anyone will be able to query the token to know that it has been unwrapped.  This simulates buying/selling a wrapped card that no one knows which card it is until it is unwrapped. If sealed metadata is not enabled, all tokens are considered unwrapped default:  False
     */
    enable_sealed_metadata?: boolean | null;
    /**
     * indicates whether a minter is permitted to update a token's metadata default: True
     */
    minter_may_update_metadata?: boolean | null;
    /**
     * indicates whether the owner of a token is permitted to update a token's metadata default: False
     */
    owner_may_update_metadata?: boolean | null;
    /**
     * indicates whether token ownership is public or private.  A user can still change whether the ownership of their tokens is public or private default: False
     */
    public_owner?: boolean | null;
    /**
     * indicates whether the token IDs and the number of tokens controlled by the contract are public.  If the token supply is private, only minters can view the token IDs and number of tokens controlled by the contract default: False
     */
    public_token_supply?: boolean | null;
    /**
     * indicates if the Reveal function should keep the sealed metadata private after unwrapping This config value is ignored if sealed metadata is not enabled default: False
     */
    unwrapped_metadata_is_private?: boolean | null;

}
/**
 * info needed to perform a callback message after instantiation
 */
export interface PostInitCallback {
    /**
     * code hash of the contract to execute
     */
    code_hash: string;
    /**
     * address of the contract to execute
     */
    contract_address: HumanAddr;
    /**
     * the callback message to execute
     */
    msg: Binary;
    /**
     * list of native Coin to send with the callback message
     */
    send: Coin[];

}
export interface Coin {
    amount: Uint128;
    denom: string;

}


/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type QueryMsg =
    | {
        contract_info: {

        };

    }
    | {
        contract_config: {

        };

    }
    | {
        minters: {

        };

    }
    | {
        num_tokens: {
            /**
             * optional address and key requesting to view the number of tokens
             */
            viewer?: ViewerInfo | null;

        };

    }
    | {
        all_tokens: {
            /**
             * optional number of token ids to display
             */
            limit?: number | null;
            /**
             * optionally display only token ids that come after the input String in lexicographical order
             */
            start_after?: string | null;
            /**
             * optional address and key requesting to view the list of tokens
             */
            viewer?: ViewerInfo | null;

        };

    }
    | {
        owner_of: {
            /**
             * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
             */
            include_expired?: boolean | null;
            token_id: string;
            /**
             * optional address and key requesting to view the token owner
             */
            viewer?: ViewerInfo | null;

        };

    }
    | {
        nft_info: {
            token_id: string;

        };

    }
    | {
        all_nft_info: {
            /**
             * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
             */
            include_expired?: boolean | null;
            token_id: string;
            /**
             * optional address and key requesting to view the token owner
             */
            viewer?: ViewerInfo | null;

        };

    }
    | {
        private_metadata: {
            token_id: string;
            /**
             * optional address and key requesting to view the private metadata
             */
            viewer?: ViewerInfo | null;

        };

    }
    | {
        nft_dossier: {
            /**
             * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
             */
            include_expired?: boolean | null;
            token_id: string;
            /**
             * optional address and key requesting to view the token information
             */
            viewer?: ViewerInfo | null;

        };

    }
    | {
        token_approvals: {
            /**
             * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
             */
            include_expired?: boolean | null;
            token_id: string;
            /**
             * the token owner's viewing key
             */
            viewing_key: string;

        };

    }
    | {
        inventory_approvals: {
            address: HumanAddr;
            /**
             * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
             */
            include_expired?: boolean | null;
            /**
             * the viewing key
             */
            viewing_key: string;

        };

    }
    | {
        approved_for_all: {
            /**
             * optionally include expired Approvals in the response list.  If ommitted or false, expired Approvals will be filtered out of the response
             */
            include_expired?: boolean | null;
            owner: HumanAddr;
            /**
             * optional viewing key to authenticate this query.  It is "optional" only in the sense that a CW721 query does not have this field.  However, not providing the key will always result in an empty list
             */
            viewing_key?: string | null;

        };

    }
    | {
        tokens: {
            /**
             * optional number of token ids to display
             */
            limit?: number | null;
            owner: HumanAddr;
            /**
             * optionally display only token ids that come after the input String in lexicographical order
             */
            start_after?: string | null;
            /**
             * optional address of the querier if different from the owner
             */
            viewer?: HumanAddr | null;
            /**
             * optional viewing key
             */
            viewing_key?: string | null;

        };

    }
    | {
        is_unwrapped: {
            token_id: string;

        };

    }
    | {
        verify_transfer_approval: {
            /**
             * address that has approval
             */
            address: HumanAddr;
            /**
             * list of tokens to verify approval for
             */
            token_ids: string[];
            /**
             * viewing key
             */
            viewing_key: string;

        };

    }
    | {
        transaction_history: {
            address: HumanAddr;
            /**
             * optional page to display
             */
            page?: number | null;
            /**
             * optional number of transactions per page
             */
            page_size?: number | null;
            /**
             * viewing key
             */
            viewing_key: string;

        };

    }
    | {
        registered_code_hash: {
            /**
             * the contract whose receive registration info you want to view
             */
            contract: HumanAddr;

        };

    };


/**
* the address and viewing key making an authenticated query request
*/
export interface ViewerInfo {
    /**
     * querying address
     */
    address: HumanAddr;
    /**
     * authentication key string
     */
    viewing_key: string;

}

/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type QueryAnswer =
    | {
        contract_info: {
            name: string;
            symbol: string;

        };

    }
    | {
        contract_config: {
            burn_is_enabled: boolean;
            minter_may_update_metadata: boolean;
            owner_is_public: boolean;
            owner_may_update_metadata: boolean;
            sealed_metadata_is_enabled: boolean;
            token_supply_is_public: boolean;
            unwrapped_metadata_is_private: boolean;

        };

    }
    | {
        minters: {
            minters: HumanAddr[];

        };

    }
    | {
        num_tokens: {
            count: number;

        };

    }
    | {
        token_list: {
            tokens: string[];

        };

    }
    | {
        owner_of: {
            approvals: Cw721Approval[];
            owner: HumanAddr;

        };

    }
    | {
        token_approvals: {
            owner_is_public: boolean;
            private_metadata_is_public: boolean;
            private_metadata_is_public_expiration?: Expiration | null;
            public_ownership_expiration?: Expiration | null;
            token_approvals: Snip721Approval[];

        };

    }
    | {
        inventory_approvals: {
            inventory_approvals: Snip721Approval[];
            owner_is_public: boolean;
            private_metadata_is_public: boolean;
            private_metadata_is_public_expiration?: Expiration | null;
            public_ownership_expiration?: Expiration | null;

        };

    }
    | {
        nft_info: {
            description?: string | null;
            image?: string | null;
            name?: string | null;

        };

    }
    | {
        private_metadata: {
            description?: string | null;
            image?: string | null;
            name?: string | null;

        };

    }
    | {
        all_nft_info: {
            access: Cw721OwnerOfResponse;
            info?: Metadata | null;

        };

    }
    | {
        nft_dossier: {
            display_private_metadata_error?: string | null;
            inventory_approvals?: Snip721Approval[] | null;
            owner?: HumanAddr | null;
            owner_is_public: boolean;
            private_metadata?: Metadata | null;
            private_metadata_is_public: boolean;
            private_metadata_is_public_expiration?: Expiration | null;
            public_metadata?: Metadata | null;
            public_ownership_expiration?: Expiration | null;
            token_approvals?: Snip721Approval[] | null;

        };

    }
    | {
        approved_for_all: {
            operators: Cw721Approval[];

        };

    }
    | {
        is_unwrapped: {
            token_is_unwrapped: boolean;

        };

    }
    | {
        verify_transfer_approval: {
            approved_for_all: boolean;
            first_unapproved_token?: string | null;

        };

    }
    | {
        transaction_history: {
            txs: Tx[];

        };

    }
    | {
        registered_code_hash: {
            also_implements_batch_receive_nft: boolean;
            code_hash?: string | null;

        };

    };

/**
* at the given point in time and after, Expiration will be considered expired
*/
export type Expiration =
    | "never"
    | {
        at_height: number;

    }
    | {
        at_time: number;

    };
/**
* tx type and specifics
*/
export type TxAction =
    | {
        transfer: {
            /**
             * previous owner
             */
            from: HumanAddr;
            /**
             * new owner
             */
            recipient: HumanAddr;
            /**
             * optional sender if not owner
             */
            sender?: HumanAddr | null;

        };

    }
    | {
        mint: {
            /**
             * minter's address
             */
            minter: HumanAddr;
            /**
             * token's first owner
             */
            recipient: HumanAddr;

        };

    }
    | {
        burn: {
            /**
             * burner's address if not owner
             */
            burner?: HumanAddr | null;
            /**
             * previous owner
             */
            owner: HumanAddr;

        };

    };

/**
* CW721 Approval
*/
export interface Cw721Approval {
    /**
     * expiration of this approval
     */
    expires: Expiration;
    /**
     * address that can transfer the token
     */
    spender: HumanAddr;

}
/**
* SNIP721 Approval
*/
export interface Snip721Approval {
    /**
     * whitelisted address
     */
    address: HumanAddr;
    /**
     * optional expiration if the address has transfer permission
     */
    transfer_expiration?: Expiration | null;
    /**
     * optional expiration if the address has view owner permission
     */
    view_owner_expiration?: Expiration | null;
    /**
     * optional expiration if the address has view private metadata permission
     */
    view_private_metadata_expiration?: Expiration | null;

}
/**
* response of CW721 OwnerOf
*/
export interface Cw721OwnerOfResponse {
    /**
     * list of addresses approved to transfer this token
     */
    approvals: Cw721Approval[];
    /**
     * Owner of the token if permitted to view it
     */
    owner?: HumanAddr | null;

}
/**
* token metadata
*/
export interface Metadata {
    /**
     * optional description
     */
    description?: string | null;
    /**
     * optional uri to contain an image, additional data fields, etc...
     */
    image?: string | null;
    /**
     * optional indentifier
     */
    name?: string | null;

}
/**
* tx for display
*/
export interface Tx {
    /**
     * tx type and specifics
     */
    action: TxAction;
    /**
     * the block containing this tx
     */
    blockheight: number;
    /**
     * optional memo
     */
    memo?: string | null;
    /**
     * token id
     */
    token_id: string;
    /**
     * tx id
     */
    tx_id: number;

}

/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type HandleMsg =
    | {
        mint_nft: {
            /**
             * optional memo for the tx
             */
            memo?: string | null;
            /**
             * optional owner address. if omitted, owned by the message sender
             */
            owner?: HumanAddr | null;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * optional private metadata that can only be seen by the owner and whitelist
             */
            private_metadata?: Metadata | null;
            /**
             * optional public metadata that can be seen by everyone
             */
            public_metadata?: Metadata | null;
            /**
             * optional token id. if omitted, use current token index
             */
            token_id?: string | null;

        };

    }
    | {
        batch_mint_nft: {
            /**
             * list of mint operations to perform
             */
            mints: Mint[];
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        set_public_metadata: {
            /**
             * the new public metadata
             */
            metadata: Metadata;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * id of the token whose public metadata should be updated
             */
            token_id: string;

        };

    }
    | {
        set_private_metadata: {
            /**
             * the new private metadata
             */
            metadata: Metadata;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * id of the token whose private metadata should be updated
             */
            token_id: string;

        };

    }
    | {
        reveal: {
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * id of the token to unwrap
             */
            token_id: string;

        };

    }
    | {
        make_ownership_private: {
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        set_global_approval: {
            /**
             * optional expiration
             */
            expires?: Expiration | null;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * optional token id to apply approval/revocation to
             */
            token_id?: string | null;
            /**
             * optional permission level for viewing the owner
             */
            view_owner?: AccessLevel | null;
            /**
             * optional permission level for viewing private metadata
             */
            view_private_metadata?: AccessLevel | null;

        };

    }
    | {
        set_whitelisted_approval: {
            /**
             * address being granted/revoked permission
             */
            address: HumanAddr;
            /**
             * optional expiration
             */
            expires?: Expiration | null;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * optional token id to apply approval/revocation to
             */
            token_id?: string | null;
            /**
             * optional permission level for transferring
             */
            transfer?: AccessLevel | null;
            /**
             * optional permission level for viewing the owner
             */
            view_owner?: AccessLevel | null;
            /**
             * optional permission level for viewing private metadata
             */
            view_private_metadata?: AccessLevel | null;

        };

    }
    | {
        approve: {
            /**
             * optional expiration for this approval
             */
            expires?: Expiration | null;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * address being granted the permission
             */
            spender: HumanAddr;
            /**
             * id of the token that the spender can transfer
             */
            token_id: string;

        };

    }
    | {
        revoke: {
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * address whose permission is revoked
             */
            spender: HumanAddr;
            /**
             * id of the token that the spender can no longer transfer
             */
            token_id: string;

        };

    }
    | {
        approve_all: {
            /**
             * optional expiration for this approval
             */
            expires?: Expiration | null;
            /**
             * address being granted permission to transfer
             */
            operator: HumanAddr;
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        revoke_all: {
            /**
             * address whose permissions are revoked
             */
            operator: HumanAddr;
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        transfer_nft: {
            /**
             * optional memo for the tx
             */
            memo?: string | null;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * recipient of the transfer
             */
            recipient: HumanAddr;
            /**
             * id of the token to transfer
             */
            token_id: string;

        };

    }
    | {
        batch_transfer_nft: {
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * list of transfers to perform
             */
            transfers: Transfer[];

        };

    }
    | {
        send_nft: {
            /**
             * address to send the token to
             */
            contract: HumanAddr;
            /**
             * optional memo for the tx
             */
            memo?: string | null;
            /**
             * optional message to send with the (Batch)RecieveNft callback
             */
            msg?: Binary | null;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * id of the token to send
             */
            token_id: string;

        };

    }
    | {
        batch_send_nft: {
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * list of sends to perform
             */
            sends: Send[];

        };

    }
    | {
        burn_nft: {
            /**
             * optional memo for the tx
             */
            memo?: string | null;
            /**
             * optional message length padding
             */
            padding?: string | null;
            /**
             * token to burn
             */
            token_id: string;

        };

    }
    | {
        batch_burn_nft: {
            /**
             * list of burns to perform
             */
            burns: Burn[];
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        register_receive_nft: {
            /**
             * optionally true if the contract also implements BatchReceiveNft.  Defaults to false if not specified
             */
            also_implements_batch_receive_nft?: boolean | null;
            /**
             * receving contract's code hash
             */
            code_hash: string;
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        create_viewing_key: {
            /**
             * entropy String used in random key generation
             */
            entropy: string;
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        set_viewing_key: {
            /**
             * desired viewing key
             */
            key: string;
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        add_minters: {
            /**
             * list of addresses that can now mint
             */
            minters: HumanAddr[];
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        remove_minters: {
            /**
             * list of addresses no longer allowed to mint
             */
            minters: HumanAddr[];
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        set_minters: {
            /**
             * list of addresses with minting authority
             */
            minters: HumanAddr[];
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        change_admin: {
            /**
             * address with admin authority
             */
            address: HumanAddr;
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    }
    | {
        set_contract_status: {
            /**
             * status level
             */
            level: ContractStatus;
            /**
             * optional message length padding
             */
            padding?: string | null;

        };

    };
/**
* permission access level
*/
export type AccessLevel = "approve_token" | "all" | "revoke_token" | "none";
/**
* Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
*
* This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>
*/
export type ContractStatus = "normal" | "stop_transactions" | "stop_all";

/**
* token metadata
*/
export interface Metadata {
    /**
     * optional description
     */
    description?: string | null;
    /**
     * optional uri to contain an image, additional data fields, etc...
     */
    image?: string | null;
    /**
     * optional indentifier
     */
    name?: string | null;

}
/**
* token mint info used when doing a BatchMint
*/
export interface Mint {
    /**
     * optional memo for the tx
     */
    memo?: string | null;
    /**
     * optional owner address, owned by the minter otherwise
     */
    owner?: HumanAddr | null;
    /**
     * optional private metadata that can only be seen by owner and whitelist
     */
    private_metadata?: Metadata | null;
    /**
     * optional public metadata that can be seen by everyone
     */
    public_metadata?: Metadata | null;
    /**
     * optional token id, if omitted, use current token index
     */
    token_id?: string | null;

}
/**
* token transfer info used when doing a BatchTransferNft
*/
export interface Transfer {
    /**
     * optional memo for the tx
     */
    memo?: string | null;
    /**
     * recipient of the transferred tokens
     */
    recipient: HumanAddr;
    /**
     * tokens being transferred
     */
    token_ids: string[];

}
/**
* send token info used when doing a BatchSendNft
*/
export interface Send {
    /**
     * recipient of the sent tokens
     */
    contract: HumanAddr;
    /**
     * optional memo for the tx
     */
    memo?: string | null;
    /**
     * optional message to send with the (Batch)RecieveNft callback
     */
    msg?: Binary | null;
    /**
     * tokens being sent
     */
    token_ids: string[];

}
/**
* token burn info used when doing a BatchBurnNft
*/
export interface Burn {
    /**
     * optional memo for the tx
     */
    memo?: string | null;
    /**
     * tokens being burnt
     */
    token_ids: string[];

}
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type HandleAnswer =
    | {
        mint_nft: {
            token_id: string;

        };

    }
    | {
        batch_mint_nft: {
            token_ids: string[];

        };

    }
    | {
        set_public_metadata: {
            status: ResponseStatus;

        };

    }
    | {
        set_private_metadata: {
            status: ResponseStatus;

        };

    }
    | {
        make_ownership_private: {
            status: ResponseStatus;

        };

    }
    | {
        reveal: {
            status: ResponseStatus;

        };

    }
    | {
        approve: {
            status: ResponseStatus;

        };

    }
    | {
        revoke: {
            status: ResponseStatus;

        };

    }
    | {
        approve_all: {
            status: ResponseStatus;

        };

    }
    | {
        revoke_all: {
            status: ResponseStatus;

        };

    }
    | {
        set_global_approval: {
            status: ResponseStatus;

        };

    }
    | {
        set_whitelisted_approval: {
            status: ResponseStatus;

        };

    }
    | {
        transfer_nft: {
            status: ResponseStatus;

        };

    }
    | {
        batch_transfer_nft: {
            status: ResponseStatus;

        };

    }
    | {
        send_nft: {
            status: ResponseStatus;

        };

    }
    | {
        batch_send_nft: {
            status: ResponseStatus;

        };

    }
    | {
        burn_nft: {
            status: ResponseStatus;

        };

    }
    | {
        batch_burn_nft: {
            status: ResponseStatus;

        };

    }
    | {
        register_receive_nft: {
            status: ResponseStatus;

        };

    }
    | {
        viewing_key: {
            key: string;

        };

    }
    | {
        add_minters: {
            status: ResponseStatus;

        };

    }
    | {
        remove_minters: {
            status: ResponseStatus;

        };

    }
    | {
        set_minters: {
            status: ResponseStatus;

        };

    }
    | {
        change_admin: {
            status: ResponseStatus;

        };

    }
    | {
        set_contract_status: {
            status: ResponseStatus;

        };

    };
export type ResponseStatus = "success" | "failure";