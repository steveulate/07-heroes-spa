import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {

    const {id} = useParams();

    const hero = useMemo( ()=> getHeroById(id), [id] );

    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    }

    if(!hero){
        return <Navigate to='/marvel'/>
    }


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={`/assets/heroes/${id}.jpg`}
                    alt={hero.superhero} 
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8">
                <h3>{hero.superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b>Alter ego:</b> <b>{hero.alter_ego}</b></li>
                    <li className="list-group-item"> <b>Publisher:</b> <b>{hero.publisher}</b></li>
                    <li className="list-group-item"> <b>First appereance:</b> <b>{hero.first_appearance}</b></li>
                </ul>
                <h4 className="mt-3"> Characters</h4>
                <p>{hero.characters}</p>

                <button 
                    className="btn btn-outline-primary"
                    onClick={onNavigateBack}
                >
                    Back
                </button>

            </div>
        </div>
    )
}
