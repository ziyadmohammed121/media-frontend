import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategories, deleteCategory, getallCategory, getvideos, updateCategory } from '../services/allapi';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Trash2 } from 'feather-icons-react/build/IconComponents';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';



function Category() {

  const [allCategory, setallCategory] = useState([])

  const [show, setShow] = useState(false);
  const [CategoryItem, setaddCategory] = useState({ id: '', categoryName: '', allVideos: [] });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // get category list  function

  const getCategoryList = async () => {

    const response = await getallCategory()

    // console.log(response.data);

    setallCategory(response.data)

  }

  console.log(allCategory);

  const handleDeleteCategory = async (e, id) => {

    e.preventDefault()

    console.log(id);

    await deleteCategory(id)

    getCategoryList()

  }

  useEffect(() => {

    getCategoryList()

  }, [])


  const addCategoryForm = (e) => {
    const { name, value } = e.target;
    setaddCategory({ ...CategoryItem, [name]: value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const { id, categoryName } = CategoryItem;

    if (!id || !categoryName) {
      toast.warning('Please fill the form completely');
    } else {
      const response = await addCategories(CategoryItem);
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        setShow(false);
        toast.success('Data added successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        getCategoryList()
      }
      else {
        toast.error('Please provide a unique id !!!');
      }
    }
  }
  // drag over
  const dragover = e => {
    e.preventDefault()
    console.log('dragging over the category board!!!');

  }

  // dropped

  const dropped = async (e, categoryId) => {

    console.log("dropped category id", categoryId);
    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log("sourcecard id is", sourceCardId);

    // logic to implement adding card in the given category

    let { data } = await getvideos(sourceCardId)

    // console.log(response);


    console.log("source video data", data);

    let selectCategory = allCategory.find(item => item.id == categoryId)

    console.log("target category details", selectCategory);
    // use push to add data into an array

    selectCategory.allVideos.push(data)

    console.log("updated target category details", selectCategory);

    await updateCategory(categoryId, selectCategory)

    getCategoryList()


  }

  return (
    <>
      <div className="d-grid">
        <div className="btn btn-dark m-2" onClick={handleShow}>
          Add Category
        </div>
      </div>
      {
        allCategory?.map(item => (
          <div>

            <div droppable onDragOver={e => dragover(e)} onDrop={e => dropped(e, item?.id)} className='d-flex justify-content-between border-rounded mt-2 p-3'>
              <h4>{item.categoryName}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}><Trash2 color="red"></Trash2></span>

              <Row>
                {
                  item?.allVideos.map((card) => (

                    <Col className='p-3 mb-1 sm{12}'>

                      <Videocard card={card} insidecategory={true}/>

                    </Col>

                  ))
                }
              </Row>

            </div>
          </div>

        ))
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingid" label="Id" className="mb-3">
            <Form.Control type="text" onChange={addCategoryForm} name="id" placeholder="Id" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingCategory" label="Category" className="mb-3">
            <Form.Control type="text" onChange={addCategoryForm} name="categoryName" placeholder="Category" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Category;