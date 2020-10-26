module.exports = function (sequelize, DataTypes) {
    var Grocery = sequelize.define("Grocery", {
        catigory: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        list: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });

    return Grocery;
};