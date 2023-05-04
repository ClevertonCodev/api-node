const express = require('express');
const { Products, Tags } = require('../db/models');
const TagsController = require('./TagsController');


module.exports = {

  async create(req, res) {
    try {
      const { tags, ...data } = req.body;
      
      const Produtos = await Products.create(data);
      if (tags && tags.length > 0) {
        const idTags = [];
        for (const tag of tags) {
          const createdTag = await TagsController.create(tag);
          idTags.push(createdTag);
        }
        if (idTags.length > 0) {
          await Produtos.addTags(idTags)
        }
      }
      const result = await Products.findByPk(Produtos.id, { include: Tags });
      return res.status(200).json(result);

    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Não foi possível cadastrar o produto' });
    }
  },



  async getAll(req, res) {
    try {
      const Produtos = await Products.findAll({
        include: {
          model: Tags,
          attributes: ['tag'],
          through: {
            attributes: []
          }
        }
      });
      if (Produtos.length > 0) {
        return res.status(200).json(Produtos);
      } else {
        return res.status(404).json({ message: 'Não há produtos cadastrados' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  },
  async getOne(req, res) {
    try {
      const Produtos = await Products.findByPk(req.params.id, { include: Tags });
      if (Produtos) {
        return res.status(200).json(Produtos);
      } else {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }

  },

  async update(req, res) {
    try {
      const Produtos = await Products.findByPk(req.params.id, { include: Tags });
      if (Produtos) {
        await Produtos.update(req.body);
        return res.status(200).json(Produtos);
      } else {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async upload(req, res) {
    try {
      const Produtos = await Products.findByPk(req.params.id, { include: Tags });
      if (Produtos) {

        Produtos.foto = `/static/uploads/${req.file.filename}`;
        await Produtos.save();
        return res.status(200).json(Produtos);
      } else {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async delete(req, res) {
    try {
      const Produtos = await Products.findByPk(req.params.id);
      if (Produtos) {
        await Produtos.destroy();
        return res.status(200).json({ message: 'Produto excluído com sucesso' });
      } else {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir produto' });
    }
  }
}


