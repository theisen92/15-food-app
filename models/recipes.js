module.exports = function (sequelize, DataTypes) {
    var Recipes = sequelize.define("Recipes", {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        recipeName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        steps: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        dairy: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            len: [1]
        },
        eggs: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            len: [1]
        },
        nuts: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            len: [1]
        },
        wheat: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            len: [1]
        },
        soy: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            len: [1]
        },
        fish: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            len: [1]
        },
    });

    return Recipes;
};