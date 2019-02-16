const extend = require('js-base/core/extend');
const FlShopCardDesign = require('library/FlShopCard');
const pushClassNames = require("@smartface/contx/lib/styling/action/pushClassNames");
const removeClassName = require("@smartface/contx/lib/styling/action/removeClassName");


const STARICON_CLASSNAME = '.shoppingCard_starIcon';
const STARICON_PASSIVE_CLASSNAME = '.shoppingCard_starIcon.passive';

const FlShopCard = extend(FlShopCardDesign)(
    // Constructor
    function(_super, props = {}, pageName) {
        // Initalizes super class for this scope
        _super(this, props);
        this.pageName = pageName;
        var starCount = 0;
        const starIcons = [{ isActive: true, comp: this.imgStar1 },
            { isActive: true, comp: this.imgStar2 }, { isActive: true, comp: this.imgStar3 },
            { isActive: true, comp: this.imgStar4 }, { isActive: true, comp: this.imgStar5 }
        ];
        let curSymbol ="$";
        let money = 0;
        this.lblCost.rippleColor = true;
        this.rippleColor = true;
        Object.defineProperties(this, {
            tableImage: {
                set: value => {
                    this.imgLogo.loadFromUrl(value);
                }
            },
            tableTitle: {
                set: value => {
                    this.lblTitle.text = value;
                },
                get: () => this.lblTitle.text
            },
            tableSubTitle: {
                set: value => {
                    this.lblSubtitle.text = value;
                },
                get: () => this.lblSubtitle.text
            },
            tableRank: {
                set: value => {
                    this.lblRank.text = "(" + value + ")";
                },
                get: () => this.lblRank.text
            },
            tableCost: {
                set: value => {
                    money = value;
                    this.lblCost.text = curSymbol+money;
                },
                get: () => this.lblCost.text
            },
            currencySymbol : {
                set: value => {
                    curSymbol = value || curSymbol;
                    this.lblCost.text = curSymbol+money;
                },
                get: () => curSymbol
            },
            tableStarCount: {
                set: value => {
                    starCount = value;
                    starIcons.forEach((star, index) => {
                        if (index < starCount) {
                            if (!star.isActive) {
                                star.comp.dispatch(pushClassNames(STARICON_CLASSNAME));
                                star.comp.dispatch(removeClassName(STARICON_PASSIVE_CLASSNAME));
                                star.isActive = true;
                            }
                        }
                        else if (star.isActive) {
                            star.comp.dispatch(pushClassNames(STARICON_PASSIVE_CLASSNAME));
                            star.comp.dispatch(removeClassName(STARICON_CLASSNAME));
                            star.isActive = false;
                        }
                    });
                },
                get: () => starCount
            }

        });


    }
);

module.exports = FlShopCard;
