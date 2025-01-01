module.exports = (sequelize, Sequelize) => {
  const MedicalAdvice = sequelize.define("medical_advices", {
    adviceId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "advice_id",
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "title",
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: "description",
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: "updated_at",
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "deleted_at",
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "created_by",
    },
    updatedBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "updated_by",
    },
    deletedBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "deleted_by",
    },
  });
  return MedicalAdvice;
};
