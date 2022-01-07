import QRCode from "qrcode";
import { ISettings } from "../clients/BrowserStorage";

export class ConfigQR {
    static generateCode(config: ISettings): Promise<string> {
        return QRCode.toDataURL(JSON.stringify(config), { 
            margin: 1,
            errorCorrectionLevel: "H"
         });
    }
}