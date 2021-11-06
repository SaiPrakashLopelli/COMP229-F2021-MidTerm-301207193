// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');


/* GET books List page. READ */
router.get('/', (req, res, next) => {


  book.find( (err, books) => {//to find the book as per the request find syntax is used


    if (err) {


      return console.error(err);
    }
    else {


      res.render('books/index', {
        title: 'Books',
        books: books
      });

    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  let books = book({
  //here i have placed new object for adding new book operation in the above line
  });


res.render('books/details', {title: 'Add new Book', books: books}) 

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

let   new_book=book({


    'Author':req.body.author,
  'Title':req.body.title,
   'Genre':req.body.genre,
  'Price':req.body.price

});


book.create(new_book,(err,new_book)=>{/*here we are giving the object and creating method*/
  if(err)
  {

      console.log(err);
      res.render(err);


  }
  else{


    res.redirect('/books')

  }
})

})

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let  id=req.params.id;
  

  book.findById(id,(err,book_to_edit)=>{//through this syntax we can find the book to edit
    if(err)

    {
     
      console.log(err);
      res.end(err);
    }

    else{
      res.render('books/details',{title:'book-edit',books:book_to_edit});
    }

  })

   
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let  id=req.params.id;

  let  book_edited=book({

    _id:id,
      'Author':req.body.author,
    'Title':req.body.title,
     'Genre':req.body.genre,
    'Price':req.body.price

  })
  

  book.updateOne({_id:id},book_edited,(err)=>{//updtaeOne function is used to update the details of the book
    if(err){

        console.log(err);
        res.end(err);

    
    }
    else {


    res.redirect('/books');
    }
  })


});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let  id=req.params.id;

  
  book.remove({_id:id},(err)=>{

   if(err){

       console.log(err);
       res.end(err);
 
   }

   else {

   
   res.redirect('/books');
   }

 })
     
 });
 module.exports = router;
 
