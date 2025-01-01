module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("medical_advices", [
      {
        title: "Stay Hydrated",
        description:
          "Drink at least 8 glasses of water daily to stay hydrated and maintain good health.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Regular Exercise",
        description:
          "Engage in at least 30 minutes of moderate exercise 5 days a week.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Healthy Diet",
        description:
          "Incorporate a balanced diet with fruits, vegetables, proteins, and whole grains.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Adequate Sleep",
        description:
          "Get 7-8 hours of sleep daily to promote overall well-being.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Wash Your Hands",
        description:
          "Wash your hands regularly to prevent the spread of germs and infections.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Regular Check-Ups",
        description: "Visit your doctor annually for routine check-ups.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Mental Health Matters",
        description:
          "Take care of your mental health by practicing mindfulness and seeking help when needed.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Avoid Smoking",
        description:
          "Smoking is harmful to your lungs and overall health. Consider quitting.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Limit Alcohol",
        description: "Drink alcohol in moderation or avoid it altogether.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Stay Active",
        description: "Incorporate physical activities into your daily routine.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Protect Your Skin",
        description: "Use sunscreen to protect your skin from harmful UV rays.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Maintain Good Posture",
        description: "Practice good posture to avoid back and neck problems.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Dental Hygiene",
        description: "Brush and floss your teeth daily for good oral health.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Stay Vaccinated",
        description:
          "Keep your vaccinations up to date to protect against diseases.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Limit Screen Time",
        description:
          "Take breaks from screens to reduce eye strain and improve focus.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Stay Social",
        description:
          "Maintain social connections to boost your emotional health.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Manage Stress",
        description:
          "Practice relaxation techniques like deep breathing to manage stress.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Drink Herbal Teas",
        description: "Enjoy herbal teas to promote relaxation and good health.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Avoid Processed Foods",
        description: "Limit the intake of processed foods for better health.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
      {
        title: "Stay Positive",
        description:
          "Maintain a positive outlook on life to improve mental and physical health.",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("medical_advices", null, {});
  },
};
