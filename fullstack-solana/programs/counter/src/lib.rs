use anchor_lang::prelude::*;

declare_id!("2cP8NABvXKBvjCkXHN6chZZANRucemvnZo5vfmyG4JBH");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
