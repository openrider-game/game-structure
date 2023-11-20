export default interface LifeCycle {
    /**
     * Frame-rate independant update for physics calculations
     */
    fixedUpdate(): void;

    /**
     * Updates the game object every frame
     */
    update(progress: number, delta: number): void;

    /**
     * Renders the game object on a canvas
     */
    render(ctx: CanvasRenderingContext2D): void;
}