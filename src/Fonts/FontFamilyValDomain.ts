import FontFamily from '../Css/Text/FontFamily';
import FontFamilyType from './FontFamilyType';
import FontFace from './FontFace';
import FontFaceAccessor from './FontFaceAccessor';
import _ from 'lodash';

export default class FontFamilyValDomain {

    id: number;
    protected _fontFace: FontFace = null;
    private owner: FontFamily = null;

    private name: string = '';
    
    private type: FontFamilyType;
    
    
    constructor(name: string, type: string) {
        
        this.name = name
        this.type = new FontFamilyType(type)
    }
    public setOwner(value: FontFamily) {
        this.owner = value;
    }

    get fontType() {
        return this.type.typeName
    }
    
    set fontType(arg) {
        this.type.typeName = arg
    }
    
    
    get fontFace() {
        return this._fontFace
    }
    
    set fontFace(arg) {
        console.log('set fontFace(arg)');
        console.log(arg);
        if (arg) {
            console.log(arg.name);
            this.name = arg.name

        }
        this._fontFace = arg
    }
    
    get fontName() {
        if (this.fontFace) {
            return this.fontFace.name
        }
        return this.name
    }
    
    set fontName(arg) {
        this.name = arg
        // console.log('fontName');
        // console.log(this.name);
        
        // if (this.fontType === 'custom') {

        //     var customFontFamilyList = FontFaceAccessor.getInstance().getAccessableProperty()
        // // console.log(customFontFamilyList);
        
        //     for (const el of customFontFamilyList) {
        //         if (el.fontName === this.fontName) {
        //             this.fontFace = el.fontFace
        //             break
        //         }
        //     }
        // // console.log(customFontFamilyList);
        // }
}

    get availableFontTypes(): Object {
        var res = {}
        var allFontFamilyList = FontFamily.getAccessableProperty()
        allFontFamilyList = allFontFamilyList.concat(FontFaceAccessor.getInstance().getAccessableProperty())
        // console.log(allFontFamilyList);
        
        for (const el of allFontFamilyList) {
            res[el.getType()] = el.getType()
        }

        return res
    }
    get availableFonts(): FontFamilyValDomain[] {
        var res = []
        var allFontFamilyList = FontFamily.getAccessableProperty()
        allFontFamilyList = allFontFamilyList.concat(FontFaceAccessor.getInstance().getAccessableProperty())

        for (var el of allFontFamilyList) {
           
            if (el.getType() === this.fontType) {
                if (el.fontName == this.fontName) {
                    res.push(el)
                    continue
                }
                 if (el.fontFace) {
                    if (!this.owner.hasThisFont(el)) {
                        res.push(el)
                    }
      
                } else {
                    res.push(el)
                    
                }
            }
        }
        // console.log('get availableFonts()');
        // console.log(this.fontFamilyManager);
        // console.log(res);
        // console.log(this.allFontFamilyList);
        return res
    }

    public getType(): string {
        return this.type.typeName;
    }
    protected setType(value: string) {
        this.type.typeName = value;
    }

    public getName(): string {
        return this.name;
    }
    protected setName(value: string) {
        this.name = value;
    }
    

    public equals(arg: FontFamilyValDomain): boolean {

        return this.getName().toLowerCase().trim() === arg.getName().toLowerCase().trim()
    }
}