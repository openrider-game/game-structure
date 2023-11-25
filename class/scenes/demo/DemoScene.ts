import Scene from "../../core/scene/Scene";
import Layer from "../../core/scene/layer/Layer";
import { LAYER_BACKGROUND, LAYER_EVENT } from "./DemoSceneConstants";
import DemoBackgroundLayer from "./layers/DemoBackgroundLayer";
import DemoEventLayer from "./layers/DemoEventLayer";

export default class DemoScene extends Scene {
    protected initLayers(): Map<string, Layer> {
        return new Map<string, Layer>([
            [LAYER_BACKGROUND, new DemoBackgroundLayer(this)],
            [LAYER_EVENT, new DemoEventLayer(this)]
        ]);
    }
}