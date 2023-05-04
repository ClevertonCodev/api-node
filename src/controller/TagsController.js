const express = require('express');
const { Products, Tags } = require('../db/models');


module.exports = {

    async create(req , res) {
      
      try {
        if(!req.body) { 
        const store = {
          tag: req
        } 
        const tagNOBody =  await Tags.create(store); 
        return tagNOBody.id
        } 
        const tag = await Tags.create(req.body);
        
        if(!tag){
          return res.status(500).json({ error: 'Erro inesperado!' });
        }
        return res.status(201).json(tag);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao cadastrar Tag' });
      }
    },


    async getAll(req, res) {
      try {
        const tag = await Tags.findAll( { include: {
          model: Products,
          through: {
            attributes: []
          }
        }
      });
        if (tag.length > 0) {
         return res.status(200).json(tag);
        } else {
         return res.status(404).json({ message: 'Não há tags cadastrados' });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao listar tags' });
      }
    },
    
    async getOne(req, res) {
      try {
        const tag = await Tags.findByPk(req.params.id, { include: Products });
        if (tag) {
         return res.status(200).json(tag);
        } else {
         return res.status(404).json({ error: 'Produto não encontrado' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar produto' });
      }
    
  },

    async update(req, res) {
      try {
        const tag = await Tags.findByPk(req.params.id);
        if (tag) {
          await tag.update(req.body);
          return res.json(tag);
        } else {
         return res.status(404).json({ error: 'Produto não encontrado' });
        }
      } catch (error) {
       return res.status(500).json({ error: 'Erro ao atualizar produto' });
      }
    },

    async delete(req, res) {
      try {
        const tag = await Tags.findByPk(req.params.id);
        if (tag) {
          await tag.destroy();
         return res.status(200).json({ message: `a Tag ${tag.tag} excluído com sucesso` });
        } else {
         return res.status(404).json({ error: 'Produto não encontrado' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir produto' });
      }
    },
    
}
