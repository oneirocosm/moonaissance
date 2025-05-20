export interface RunResult {
    time: string;
    enemies: string;
    penalty: string;
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
     * The scores of the player
     */
    results: Record<string, RunResult>;
}
