const settingDescriptions = {
    // Generic
    base_config: 'look into Valve Documentation on `Game Modes`',
    game_type: 'look into Valve Documentation on `Game Modes`',
    game_mode: 'look into Valve Documentation on `Game Modes`',

    // Roundflow
    mp_maxrounds: 'Max number of rounds to play before server changes maps.',
    mp_roundtime: 'Time (in minutes) each round lasts. ',
    mp_warmuptime: 'Time (in seconds) for warmup before match starts.',
    mp_freezetime: 'Freeze time at start of round in seconds.',
    mp_buytime: 'How many seconds after round start players can buy items. ',
    mp_buy_anywhere: 'Allow buying from anywhere on the map (1 = yes, 0 = no).',
    mp_ignore_round_win_conditions: 'If set, rounds won’t end by win conditions.',
    mp_round_restart_delay: 'Delay (in seconds) before the next round starts.',
    mp_win_panel_display_time: 'How long the round win panel stays visible.',
    mp_respawn_on_death_t: 'Auto-respawn Terrorists when they die.',
    mp_respawn_on_death_ct: 'Auto-respawn Counter-Terrorists when they die.',
    mp_respawn_immunitytime: 'Seconds of invulnerability after respawn.',
    mp_halftime: 'Enable halftime after a set number of rounds.',

    // Bots
    bot_autodifficulty_threshold_high: 'Upper bound above Avg Human Contribution Score that a bot must be above to change its difficulty.',
    bot_autodifficulty_threshold_low: 'Lower bound below which bot skill should increase..',
    bot_chatter: 'Defines bot communication level (e.g., "normal").',
    bot_defer_to_human_goals: 'If true, bots won’t complete objectives if a human is able to.',
    bot_defer_to_human_items: 'Bots won’t take important items like defusers from humans.',
    bot_difficulty: 'Bot skill level (0-3).',
    bot_quota_mode: 'Mode for adding bots to teams (e.g., "fill").',

    // Movement
    sv_enablebunnyhopping: 'Enable or disable unrestricted bunnyhopping.',
    sv_accelerate: 'Controls ground acceleration speed.',
    sv_airaccelerate: 'Air acceleration value.',
    sv_friction: 'Friction applied to player movement.',
    sv_gravity: 'Gravity force applied to players. ',
    sv_maxspeed: 'Maximum movement speed.',

    // Weapons
    mp_weapons_allow_map_placed: 'Whether weapons placed by the map should spawn.',
    mp_buy_during_immunity: 'Allow buying during spawn immunity period.',
    mp_death_drop_defuser: 'If 1, players drop defusers when they die.',
    mp_death_drop_grenade: 'Which grenades get dropped (0 = none, 2 = best).',
    mp_death_drop_gun: 'Which weapons are dropped on death (1 = primary, 2 = secondary).',
    mp_ct_default_melee: 'Default melee weapon for Counter-Terrorists.',
    mp_ct_default_secondary: 'Default pistol for CTs.',
    mp_ct_default_primary: 'Default rifle/SMG for CTs.',
    mp_t_default_melee: 'Default melee weapon for Terrorists.',
    mp_t_default_secondary: 'Default pistol for Ts.',
    mp_t_default_primary: 'Default rifle/SMG for Ts.',
    mp_free_armor: 'Type of armor given for free (0 = none, 1 = kevlar, 2 = helmet+kevlar).',
    mp_weapons_allow_zeus: 'Allow/disallow Zeus x27 weapon.',
    mp_weapons_allow_typecount: 'Limit how many weapon types are allowed.',
    mp_damage_scale_t_body: 'Damage multiplier for T body shots.',
    mp_damage_scale_t_head: 'Damage multiplier for T headshots.',
    mp_damage_scale_ct_body: 'Damage multiplier for CT body shots.',
    mp_damage_scale_ct_head: 'Damage multiplier for CT headshots.',

    // Players
    maxPlayers: 'Maximum number of players allowed in the match.',
    mp_autoteambalance: 'Enable or disable team auto-balancing.',
    mp_spectators_max: 'Limit of spectator slots.',
    mp_limitteams: 'Max allowed imbalance between teams.',
    mp_autokick: 'Automatically kick idle players.',
    mp_friendlyfire: 'Enable or disable friendly fire.',
    mp_solid_teammates: 'If true, teammates are solid and block movement.',
    mp_teammates_are_enemies: 'Set to 1 to turn teammates into enemies (for FFA).',
    mp_humanteam: 'Restrict human players to T, CT, or any team.',

    // Communication
    sv_alltalk: 'Everyone hears everyone’s voice comms.',
    sv_full_alltalk: 'Voice chat ignores teams and alive/dead state.',
    sv_deadtalk: 'Allow dead players to talk.',
    sv_talk_enemy_dead: 'Allow dead players to talk to enemies.',
    sv_talk_enemy_living: 'Allow living players to talk to enemies.',
    sv_allchat: 'All players see chat, regardless of team.',
    sv_spec_hear: 'Spectators can hear team voice comms.',
    sv_voiceenable: 'Turn all voice communication on or off.',
};

export default settingDescriptions;
