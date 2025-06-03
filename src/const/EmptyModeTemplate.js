const getEmptyModeTemplate = () => ({
    mapGroup: 'Active',
    description: '',
    tags: '',
    plugins: [],
    commandPacks: [],
    settings: {
        generic: {
            base_config: '',
            game_type: '',
            game_mode: ''
        },
        roundflow: {
            mp_maxrounds: '',
            mp_roundtime: '',
            mp_warmuptime: '',
            mp_freezetime: '',
            mp_buytime: '',
            mp_buy_anywhere: '',
            mp_ignore_round_win_conditions: '',
            mp_round_restart_delay: '',
            mp_win_panel_display_time: '',
            mp_respawn_on_death_t: '',
            mp_respawn_on_death_ct: '',
            mp_respawn_immunitytime: '',
            mp_halftime: ''
        },
        bots: {
            bot_autodifficulty_threshold_high: '',
            bot_autodifficulty_threshold_low: '',
            bot_chatter: '',
            bot_defer_to_human_goals: '',
            bot_defer_to_human_items: '',
            bot_difficulty: '',
            bot_quota_mode: ''
        },
        movement: {
            sv_enablebunnyhopping: '',
            sv_accelerate: '',
            sv_airaccelerate: '',
            sv_friction: '',
            sv_gravity: '',
            sv_maxspeed: ''
        },
        weapons: {
            mp_weapons_allow_map_placed: '',
            mp_buy_anywhere: '',
            mp_buy_during_immunity: '',
            mp_death_drop_defuser: '',
            mp_death_drop_grenade: '',
            mp_death_drop_gun: '',
            mp_ct_default_melee: '',
            mp_ct_default_secondary: '',
            mp_ct_default_primary: '',
            mp_t_default_melee: '',
            mp_t_default_secondary: '',
            mp_t_default_primary: '',
            mp_free_armor: '',
            mp_weapons_allow_zeus: '',
            mp_weapons_allow_typecount: '',
            mp_damage_scale_t_body: '',
            mp_damage_scale_t_head: '',
            mp_damage_scale_ct_body: '',
            mp_damage_scale_ct_head: ''
        },
        players: {
            maxPlayers: '',
            mp_autoteambalance: '',
            mp_spectators_max: '',
            mp_limitteams: '',
            mp_autokick: '',
            mp_friendlyfire: '',
            mp_solid_teammates: '',
            mp_teammates_are_enemies: '',
            mp_humanteam: ''
        },
        communication: {
            sv_alltalk: '',
            sv_full_alltalk: '',
            sv_deadtalk: '',
            sv_talk_enemy_dead: '',
            sv_talk_enemy_living: '',
            sv_allchat: '',
            sv_spec_hear: '',
            sv_voiceenable: ''
        },
        customCommands: []
    }
});

export default getEmptyModeTemplate;
