import styled from "styled-components";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs"

function Pagination({isSport, amount, next, prev, total, beginning, end, currentSlide, displayNum }) {
//   functionality to create a new slidie and add the next set of data
const slide = [];
for (let i = 1; i < Math.ceil(total / amount); i++) {
    slide.push(i);
}

  return (
    <Container>
       {beginning ? null : <button className={isSport ? 'prev-btn' : 'field-prev-btn'} onClick={() => prev()} disabled={beginning}>
            <BsArrowLeftCircle/>
        </button>}
        {end ? null : <button className={isSport ? "next-btn" : "field-next-btn"} onClick={() => next()} disabled={end}>
            <BsArrowRightCircle />
        </button>}
        {displayNum ? <p className={isSport ? "slide-num flex j-center" : "field-slide-num flex j-center"}>
        {slide.map((index) => (
                <h2 className={index === currentSlide ? 'active' : ''} key={index}>{index}</h2>
        ))}</p> : null}
    </Container>
  )
}

const Container = styled.div`
    .prev-btn {
        cursor: pointer;
        position: absolute;
        bottom: 50%;
        left: 1%;
        background-color: transparent;
        border-color: transparent;
        svg {
            font-size: 3rem;
            color: rgb(255, 205, 98);
        }
    }
    .field-prev-btn {
        cursor: pointer;
        position: absolute;
        bottom: 30%;
        left: 1%;
        background-color: transparent;
        border-color: transparent;
        svg {
            font-size: 3rem;
            color: rgb(0, 0, 0);
        }
    }
    .next-btn {
        cursor: pointer;
        position: absolute;
        bottom: 50%;
        left: 92%;
        background-color: transparent;
        border-color: transparent;
        svg {
            font-size: 3rem;
            color: rgb(255, 205, 98);
        }
    }
    .field-next-btn {
        cursor: pointer;
        position: absolute;
        bottom: 30%;
        left: 92%;
        background-color: transparent;
        border-color: transparent;
        svg {
            font-size: 3rem;
            color: rgb(0, 0, 0);
        }
    }
    .slide-num {
        color: rgb(255, 205, 98);
        font-size: 1.5rem;
        position: relative;
        bottom: 11rem;
        gap: 0.5rem;
    }
    .field-slide-num {
        color: rgb(0, 0, 0);
        font-size: 1.5rem;
        position: relative;
        bottom: 11rem;
        gap: 0.5rem;
    }
    .slide-num h2.active {
        color: white;
    }
    .field-slide-num h2.active {
        color: white;
    }
`;

export default Pagination;