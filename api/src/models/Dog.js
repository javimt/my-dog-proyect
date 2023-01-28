const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, { timestamps: false } );
};
