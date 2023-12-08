import State from "../../core/state/State";
import Layer from "../../core/state/layer/Layer";
import { LAYER_BACKGROUND, LAYER_EVENT } from "./DemoStateConstants";
import DemoBackgroundLayer from "./layers/DemoBackgroundLayer";
import DemoEventLayer from "./layers/DemoEventLayer";

export default class DemoState extends State {
    protected initLayers(): Map<string, Layer> {
        return new Map<string, Layer>([
            [LAYER_BACKGROUND, new DemoBackgroundLayer(this)],
            [LAYER_EVENT, new DemoEventLayer(this)]
        ]);
    }
}