declare module SpriteGL { 
class SpriteRenderer {
        constructor(webglContext: WebGLRenderingContext, Image: HTMLImageElement);
        RenderAll(): void;
        UpdateViewPort(width: number, height: number): void;
        DrawSpr(AtlasX: number, AtlasY: number, AtlasWidth: any, AtlasHeigh: any, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight: any): void;
        PrepareTxt(str: string, color: string, fontSize: number, outLine?: boolean): any;
        DrawTxt(txtObj: any, PosX: number, PosY: number): void;
        UpdateCamera(x: number, y: number): void;
        static fromCanvas(canvas: HTMLCanvasElement, Image: HTMLImageElement): SpriteRenderer;
    }
 }