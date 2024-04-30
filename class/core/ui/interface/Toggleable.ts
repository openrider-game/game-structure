export default interface Toggleable {
    active: boolean;

    toggle(): void;
}