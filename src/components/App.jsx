import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from 'services/fetchImages';

export const App = () => {
  const [query, setQuery] = useState('');
  const [galerryArr, setGalleryArr] = useState([]);
  const [page, setPage] = useState('1');
  const [showBtn, setShowBtn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState('');

  const onSubmitForm = query => {
    setQuery(() => query);
    setGalleryArr(() => []);
    setPage(() => 1);
  };

  const onButtomLoadMOre = () => {
    setPage(state => state + 1);
  };

  const showMod = () => {
    setShowModal( true)
  };

  const hideModal = () => {
    setShowModal(false)
  }

  const showImage = (imgLink) => {
    setShowImg(imgLink);
  };

  // showImg = imgLink => {
  //   this.setState({ showImg: imgLink });
  // };

  useEffect(() => {
    if (query === '') {
      return;
    }

const fetch =async() => {

        try {
          setShowLoader(() => true);
          const { data } = await fetchImages(query, page);

          const PER_PAGE = '12';
          const numberOfImages = data.totalHits;
          const downloadImages = PER_PAGE * page;
          if (
            numberOfImages > downloadImages
              ? setShowBtn(() => true)
              : setShowBtn(() => false)
          ) {
          }
          setGalleryArr(prevState => [...prevState, ...data.hits]);
        } catch (error) {
          console.log(error);
        } finally {
          setShowLoader(() => false);
        }
      }

    fetch();
    }, [query, page]);

  return (
    <>
      <Searchbar onSubmitForm={onSubmitForm} />
      <ImageGallery
        images={galerryArr}
        showModal={showMod}
        showImg={showImage}
      />
      {showBtn && <Button onClick={onButtomLoadMOre} />}
      {showLoader && <Loader />}
      {showModal && <Modal showImg={showImg} hideModal={hideModal} />}
    </>
  );
};
