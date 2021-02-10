import Security from "./Security";

const plugin = {

    security: function () {
        return new Security(this);
    }
    
};

export default plugin;