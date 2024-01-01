const ProductSchema = require('../model/ProductSchama')
const {query} = require("express");


const fs = require('fs')
const {promisify} = require('util')

const unlinkAsync = promisify(fs.unlink)

const create = (req, res) => {

    console.log(req.file)
    console.log(req.body)

    const product = new ProductSchema({
        name: req.body.name,
        description: req.body.description,
        image: req.file.path,
        qtyOnHand: req.body.qtyOnHand,
        unitePrice: req.body.unitePrice
    });

    product.save().then(response => {
        res.status(201).json({message: 'product', data: response})

    }).catch(error => {
        return res.status(500).json(error)

    })
}
const findById = (req, res) => {
    ProductSchema.findOne({'_id': req.params.id}).then(response => {
        if (response != null) {
            res.status(201).json(response)
        } else {
            return res.status(500).json({message: 'product not found'})
        }

    }).catch(error => {
        return res.status(500).json({message: 'product not found'})

    })

}
const update = async (req, res) => {

    const response = await ProductSchema.findOne({_id: req.params.id})
    const ff = response.image
    fs.unlinkSync(ff);
    const updateData = await ProductSchema.findByIdAndUpdate({'_id': req.params.id}, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.file.path,
            qtyOnHand: req.body.qtyOnHand,
            unitePrice: req.body.unitePrice
        }
    }, {new: true});

    if (updateData) {
        res.status(201).json({message: 'product update'})
    } else {
        return res.status(500).json({message: 'product not update'})

    }
}
const deleteById = async (req, res) => {

    const deleteData = await ProductSchema.findByIdAndDelete({'_id': req.params.id})
    if (deleteData) {
        const ff = deleteData.image
        fs.unlinkSync(ff)
        res.status(204).json({message: 'product delete'})
    } else {
        return res.status(500).json({message: 'order not delete'})

    }
}
const findAll = (req, res) => {
    /*  try{
          const {searchText,page=1,size=1}=req.query;
          const pageNumber=parseInt(page)
          const pageSize=parseInt(size)
          const query={};
          if(searchText){
              query.$text={$search:searchText}
          }

          const skip=(pageNumber-1) * pageSize;

          const data= ProductSchema.find(query)
              .limit(pageSize)
              .skip(skip)
          res.status(200).json(data)

      }catch(error){

          return res.status(500).json(error)

      }*/

    try {

        const {searchText, page = 1, size = 10} = req.query;
        const pageNumber = parseInt(page)
        const pageSize = parseInt(size)

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }

        const skip = (pageNumber - 1) * pageSize;

        ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response => {
            return res.status(200).json(response);
        })


    } catch (error) {

        return res.status(500).json(error)

    }


}

const findAllMin = (req, res) => {
    try {
        ProductSchema.find({qtyOnHand: {$lt: 10}}).then(data => {
            return res.status(200).json(data);
        })


    } catch (error) {

        return res.status(500).json(error)

    }

}


module.exports = {
    create, findById, update, deleteById, findAll, findAllMin
}