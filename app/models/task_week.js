'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task_week extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Task_week.belongsTo(models.Task, {
                foreignKey: 'task_id',
            });
        }
    }
    Task_week.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            task_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Task_week',
        },
    );
    return Task_week;
};
