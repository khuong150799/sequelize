'use strict';
const { Model } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Task.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
            Task.hasMany(models.Task_week, {
                foreignKey: 'task_id',
            });
            console.log(models);
        }
    }
    Task.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: db.User,
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'Task',
        },
    );

    return Task;
};
