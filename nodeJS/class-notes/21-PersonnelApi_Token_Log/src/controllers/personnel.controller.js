'use strict';

const Personnel = require('../models/personnel.model');
const { CustomError } = require('../utils/index');

module.exports = {
  list: async (req, res) => {
    let baseFilter = {};

    //Kullanci admin değilse ve takım lideri ise sadece kendi departmanındaki personelleri görebilir.
    if (req.user?.isLead && !req.user?.isAdmin) {
      baseFilter = { departmentId: req.user.departmentId };
    }

    const result = await res.getModelList(Personnel, null, baseFilter);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel, baseFilter),
      result,
    });
  },

  read: async (req, res) => {
    const result = await Personnel.findById(req.params.id);

    if (!result) {
      // res.errStatusCode = 404;
      // throw new Error("Data is not found.");

      throw new CustomError('Data is not found.', 404);
    }

    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    const result = await Personnel.create(req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {

    if(req.user?.isAdmin){
      const personnel = await Personnel.findById(req.params.id);
      console.log(personnel);

      if (!personnel) {
        throw new CustomError('Data is not found.', 404);
      }
    }
    const result = await Personnel.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    // const { deletedCount } = await Personnel.deleteOne({ _id: req.params.id });

    // Todo - if team lead deleted assign new team lead automatically.

    const deletedPersonnel = await Personnel.findById(req.params.id);

    if (deletedPersonnel.isLead) {
      const leadCount = await Personnel.countDocuments({
        departmentId: deletedPersonnel.departmentId,
        isLead: true,
      });

      if (leadCount <= 1) {
        throw new CustomError(
          'Cannot delete the last team lead in the department. Please assign another lead before deleting this personnel.',
          400
        );
      }

      const { deletedCount } = await Personnel.deleteOne({
        _id: req.params.id,
      });

      if (!deletedCount) {
        throw new CustomError('Data is not found or already deleted.', 404);
      }
    }

    // if (!deletedCount) {
    //   // res.errStatusCode = 404;
    //   // throw new Error("Data is not found or already deleted.");

    //   throw new CustomError('Data is not found or already deleted.', 404);
    // }

    res.sendStatus(204);
  },
};
