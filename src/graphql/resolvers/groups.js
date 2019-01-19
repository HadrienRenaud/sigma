/**
 * @file ?
 * @author ?
 */

const regeneratorRuntime = require("regenerator-runtime");

//hawkspar->akka ; doc ?
const GroupResolvers = {
    // @rights viewer(obj.uid)
    Group: {
        __resolveType: async (obj) => {
            switch (obj.type) {
            case "simple":
                return "SimpleGroup";
            case "meta":
                return "MetaGroup";
            }
        }
    },
};

export default GroupResolvers;