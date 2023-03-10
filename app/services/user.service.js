const { Op } = require('sequelize');
const db = require('../models');

exports.getAll = async (data, result) => {
    try {
        console.log(123);
        let keyword = '';
        if (data.keyword) {
            keyword = data.keyword;
        }
        // const { count, rows } = await db.User.findAndCountAll({
        //     where: {
        //         [Op.or]: [
        //             { first_name: { [Op.substring]: keyword } },
        //             { last_name: { [Op.substring]: keyword } },
        //             { email: { [Op.substring]: keyword } },
        //         ],
        //         // email: { [Op.substring]: keyword },
        //     },
        //     order: [['id', 'DESC']],
        //     offset: 0,
        //     limit: 1,
        // });
        const { count, rows } = await db.User.findAndCountAll({
            include: [
                {
                    model: db.Task,
                    required: true,
                    include: [
                        {
                            model: db.Task_week,
                            required: true,
                        },
                    ],
                },
            ],
            where: {
                [Op.or]: [
                    { first_name: { [Op.substring]: keyword } },
                    { last_name: { [Op.substring]: keyword } },
                    { email: { [Op.substring]: keyword } },
                ],
            },

            order: [['id', 'DESC']],
            offset: 0,
            limit: 10,
        });
        // console.log(count);==> number page
        // console.log(rows);
        result(null, { data: rows });
    } catch (error) {
        console.log(error);
        result({ msg: error }, null);
    }
};

exports.getById = async (id, result) => {
    try {
        const dataUser = await db.User.findOne({
            where: {
                id,
            },
        });
        result(null, { data: dataUser });
        // console.log(dataUser);
    } catch (error) {
        result({ msg: error }, null);
    }
};

exports.register = async (data, result) => {
    try {
        const [user, created] = await db.User.findOrCreate({ where: { email: data.email }, defaults: data });
        // console.log(user, created);
        if (created) {
            result(null, { msg: '????ng k?? th??nh c??ng', data: user });
        } else {
            result({ msg: 'email ???? t???n t???i' }, null);
        }
    } catch (error) {
        // console.log(error);
        result({ msg: error }, null);
    }
};

exports.update = async (data, id, result) => {
    try {
        const dataUser = await db.User.findByPk(id);
        // console.log(typeof data.email);
        if (dataUser === null) {
            result({ msg: 'ID kh??ng t???n t???i' }, null);
        }
        if (data.email == dataUser.email) {
            const resultUpdate = await db.User.update(data, { where: { id } });
            // console.log(resultUpdate);
            if (resultUpdate[0] === 1) {
                result(null, { msg: 'C???p nh???t d??? li???u th??nh c??ng' });
                return;
            }
            result({ msg: 'C???p nh???t d??? li???u th???t b???i' }, null);
        } else {
            const resAll = await db.User.findAll();
            // console.log(resAll);
            const emailAll = resAll.map((value) => value.email);

            if (!emailAll.includes(data.email)) {
                const resultUpdate = await db.User.update(data, { where: { id } });
                // console.log(resultUpdate);
                if (resultUpdate[0] === 1) {
                    result(null, { msg: 'C???p nh???t d??? li???u th??nh c??ng' });
                    return;
                }
            } else {
                result({ msg: 'Email ???? t???n t???i' }, null);
            }
        }
    } catch (error) {
        result({ msg: error }, null);
    }
};

exports.delete = async (id, result) => {
    try {
        const resultDelete = await db.User.destroy({ where: { id } });
        if (resultDelete === 1) {
            result(null, { msg: 'X??a d??? li???u th??nh c??ng' });
            return;
        }
        result({ msg: 'X??a d??? li???u th???t b???i' }, null);
    } catch (error) {
        result({ msg: error }, null);
    }
};
