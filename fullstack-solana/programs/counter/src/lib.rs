use anchor_lang::prelude::*;

declare_id!("BCtae59k54QAvFniwLYRAGda7dAVpVk4gksDg8horPqN");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
