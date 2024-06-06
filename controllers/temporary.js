const Drink = require('../models/drink');
const Ingardient = require('../models/ingredient');

const tempFunction = async (req, res, next) => {
  try {
    Ingardient.updateMany(
      {},
      {
        $unset: {
          abv: 1,
          type: 1,
          flavour: 1,
          country: 1, // Це може бути порожній масив або будь-яке значення, яке ви хочете встановити за замовчуванням для поля tagsUK
        },
      }
    )
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
    res.send('Deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Сталася помилка');
  }
};

module.exports = tempFunction;
