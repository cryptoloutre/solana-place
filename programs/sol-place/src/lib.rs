use anchor_lang::prelude::*;

declare_id!("Bmgzy9uhBVfeACPbaAHmHBMSmKnQZD3ecXD3VF5p5Qt5");

#[program]
pub mod sol_place {
    use super::*;

    const MIN_POS: u8 = 0;
    const MAX_POS: u8 = 99;
    const MIN_COL: u8 = 0;
    const MAX_COL: u8 = 255;
    const EVENT_START_TIME: i64 = 1674237600;
    const EVENT_END_TIME: i64 = 1674514799;

    pub fn initialize_vault(
        ctx: Context<InitializeVault>,
    ) -> Result<()> {

        let vault = &mut ctx.accounts.vault;
        vault.withdrawer = ctx.accounts.initializer.key();
        vault.bump = *ctx.bumps.get("vault").unwrap();

        Ok(())
    }

    pub fn initialize_player(
        ctx: Context<InitializePlayer>,
    ) -> Result<()> {

        let player = &mut ctx.accounts.player;
        player.pixel_played_count = 0;
        player.bump = *ctx.bumps.get("player").unwrap();

        Ok(())
    }

    pub fn create_pixel(
        ctx: Context<CreatePixel>,
        pos_x: u8,
        pos_y: u8,
        init_col_r: u8,
        init_col_g: u8,
        init_col_b: u8,
    ) -> Result<()> {

        let clock = Clock::get().unwrap().unix_timestamp;

        if clock < EVENT_START_TIME || clock > EVENT_END_TIME {
            return Err(error!(ErrorCode::InvalidTime));
        }

        if pos_x < MIN_POS || pos_x > MAX_POS {
            return Err(error!(ErrorCode::InvalidXCoordinate));
        }

        if pos_y < MIN_POS || pos_y > MAX_POS {
            return Err(error!(ErrorCode::InvalidYCoordinate));
        }

        if init_col_r < MIN_COL || init_col_r > MAX_COL {
            return Err(error!(ErrorCode::InvalidRColor));
        }

        if init_col_b < MIN_COL || init_col_b > MAX_COL {
            return Err(error!(ErrorCode::InvalidBColor));
        }

        if init_col_g < MIN_COL || init_col_g > MAX_COL {
            return Err(error!(ErrorCode::InvalidGColor));
        }

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.vault.key(),
            100000,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.vault.to_account_info(),
            ],
        )?;

        let pixel = &mut ctx.accounts.pixel;
        pixel.pos_x = pos_x;
        pixel.pos_y = pos_y;
        pixel.col_r = init_col_r;
        pixel.col_g = init_col_g;
        pixel.col_b = init_col_b;
        pixel.bump = *ctx.bumps.get("pixel").unwrap();
        pixel.lvl = 1;

        let player = &mut ctx.accounts.player;
        player.pixel_played_count += 1;
        
        emit!(PixelChanged {
            pos_x,
            pos_y,
            col_r: init_col_r,
            col_g: init_col_g,
            col_b: init_col_b,
        });

        emit!(PixelPlayedChanged {
            pixel_played: player.pixel_played_count,
        });

        Ok(())
    }

    pub fn update_pixel(
        ctx: Context<UpdatePixel>,
        new_col_r: u8,
        new_col_g: u8,
        new_col_b: u8,
    ) -> Result<()> {
        // Validation
        let clock = Clock::get().unwrap().unix_timestamp;

        if clock < EVENT_START_TIME || clock > EVENT_END_TIME {
            return Err(error!(ErrorCode::InvalidTime));
        }

        if new_col_r < MIN_COL || new_col_r > MAX_COL {
            return Err(error!(ErrorCode::InvalidRColor));
        }
    
        if new_col_g < MIN_COL || new_col_g > MAX_COL {
            return Err(error!(ErrorCode::InvalidBColor));
        }
    
        if new_col_b < MIN_COL || new_col_b > MAX_COL {
            return Err(error!(ErrorCode::InvalidGColor));
        }

        // Set values
        let pixel = &mut ctx.accounts.pixel;
        pixel.col_r = new_col_r;
        pixel.col_g = new_col_g;
        pixel.col_b = new_col_b;
        pixel.lvl += 1;

        let amount = 10 * u64::pow(10, 4) * u64::from(pixel.lvl);

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.vault.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.vault.to_account_info(),
            ],
        )?;
    

        let player = &mut ctx.accounts.player;
        player.pixel_played_count += 1;

        // Emit event
        emit!(PixelChanged {
            pos_x: pixel.pos_x,
            pos_y: pixel.pos_y,
            col_r: new_col_r,
            col_g: new_col_g,
            col_b: new_col_b,
        });

        emit!(PixelPlayedChanged {
            pixel_played: player.pixel_played_count,
        });
    
        Ok(())
    }

    pub fn withdraw_vault(
        ctx: Context<WithdrawVault>,
        amount_of_lamports: u64,
    ) -> Result<()> {

        let vault = &ctx.accounts.vault;
        let withdrawer = &ctx.accounts.withdrawer;

        **withdrawer.to_account_info().try_borrow_mut_lamports()? += amount_of_lamports;
        **vault.to_account_info().try_borrow_mut_lamports()? -= amount_of_lamports;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeVault<'info> {
    #[account(
        init,
        payer = initializer,
        space = Vault::LEN,
        seeds = [b"vault".as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializePlayer<'info> {
    #[account(
        init,
        payer = initializer,
        space = Player::LEN,
        seeds = [b"player".as_ref(), initializer.key().as_ref()],
        bump
    )]
    pub player: Account<'info, Player>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(pos_x: u8, pos_y: u8)]
pub struct CreatePixel<'info> {
    #[account(
        init,
        payer = user,
        space = Pixel::LEN,
        seeds = [b"pixel".as_ref(), [pos_x, pos_y].as_ref()],
        bump
    )]
    pub pixel: Account<'info, Pixel>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"vault".as_ref()],
        bump = vault.bump,
    )]
    pub vault: Account<'info, Vault>,
    #[account(
        mut,
        seeds = [b"player".as_ref(), user.key().as_ref()],
        bump = player.bump
    )]
    pub player: Account<'info, Player>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePixel<'info> {
    #[account(
        mut,
        seeds = [b"pixel".as_ref(), [pixel.pos_x, pixel.pos_y].as_ref()],
        bump = pixel.bump,
    )]
    pub pixel: Account<'info, Pixel>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"vault".as_ref()],
        bump = vault.bump,
    )]
    pub vault: Account<'info, Vault>,
    #[account(
        mut,
        seeds = [b"player".as_ref(), user.key().as_ref()],
        bump = player.bump
    )]
    pub player: Account<'info, Player>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct WithdrawVault<'info> {
    #[account(mut)]
    pub withdrawer: Signer<'info>,
    #[account(
        mut,
        seeds = [b"vault".as_ref()],
        bump = vault.bump,
        has_one = withdrawer
    )]
    pub vault: Account<'info, Vault>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Pixel {
    pub pos_x: u8,
    pub pos_y: u8,
    pub col_r: u8,
    pub col_g: u8,
    pub col_b: u8,
    pub bump: u8,
    pub lvl: u16,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const POS_LENGTH: usize = 1;
const COL_LENGTH: usize = 1;
const BUMP_LENGTH: usize = 1;
const LVL_LENGTH: usize = 2;
const PIXEL_PLAYED_COUNT_LENGTH: usize = 2;

impl Pixel {
    const LEN: usize = DISCRIMINATOR_LENGTH + (2 * POS_LENGTH) + (3 * COL_LENGTH) + BUMP_LENGTH + LVL_LENGTH;
}

#[account]
pub struct Vault {
    pub withdrawer: Pubkey,
    pub bump: u8,
}

impl Vault {
    const LEN: usize = DISCRIMINATOR_LENGTH + 32 + BUMP_LENGTH;
}

#[account]
pub struct Player {
    pub pixel_played_count: u16,
    pub bump: u8,
}

impl Player {
    const LEN: usize = DISCRIMINATOR_LENGTH + PIXEL_PLAYED_COUNT_LENGTH + BUMP_LENGTH;
}

#[error_code]
pub enum ErrorCode {
    #[msg("The event has not yet started or has ended")]
    InvalidTime,
    #[msg("The given X co-ordinate is not between 0-99")]
    InvalidXCoordinate,
    #[msg("The given Y co-ordinate is not between 0-99")]
    InvalidYCoordinate,
    #[msg("The given R color is not between 0-255")]
    InvalidRColor,
    #[msg("The given G color is not between 0-255")]
    InvalidGColor,
    #[msg("The given B color is not between 0-255")]
    InvalidBColor,
    #[msg("Not enough lamport")]
    InvalidLamportsAmount
}

#[event]
pub struct PixelChanged {
    pub pos_x: u8,
    pub pos_y: u8,
    pub col_r: u8,
    pub col_g: u8,
    pub col_b: u8,
}

#[event]
pub struct PixelPlayedChanged {
    pub pixel_played: u16,
}