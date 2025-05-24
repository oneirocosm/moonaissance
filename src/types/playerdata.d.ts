export interface RunResult {
    time: string;
    enemies: string;
    penalty: string;
    ready: boolean;
}
export interface PlayerData {
    /**
     * The name of the player
     */
    name: string;
    /**
     * The pronouns of the player
     */
    pronouns: string;
    /**
     * The penalty on all of the player's runs
     */
    playerPenalty: string;
    /**
     * The scores of the player
     */
    results: Record<string, RunResult>;
}
