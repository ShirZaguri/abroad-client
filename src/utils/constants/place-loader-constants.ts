const SCREEN_ADJUSTMENTS = new Map<
    string,
    { imageCols: number; infoCols: number; maxHeight: number }
>();
SCREEN_ADJUSTMENTS['xs'] = { imageCols: 5, infoCols: 6, maxHeight: 110 };
SCREEN_ADJUSTMENTS['sm'] = { imageCols: 3, infoCols: 2, maxHeight: 150 };
SCREEN_ADJUSTMENTS['md'] = { imageCols: 3, infoCols: 1, maxHeight: 120 };
SCREEN_ADJUSTMENTS['lg'] = { imageCols: 2, infoCols: 1, maxHeight: 150 };
SCREEN_ADJUSTMENTS['xl'] = { imageCols: 2, infoCols: 1, maxHeight: 150 };

export const PLACE_LOADER = {
    IMAGE_LOADER_TYPE: 'image',
    TITLE_LOADER_TYPE: 'heading',
    TEXT_LOADER_TYPE: 'sentences',
    TILE_LOADER: false,
    BOILERPLATE: false,
    SCREEN_ADJUSTMENTS: SCREEN_ADJUSTMENTS,
};
