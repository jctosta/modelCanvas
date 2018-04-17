import React from 'react';
import PropTypes from 'prop-types';
import DropArea from './DropArea';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Proposta de Valor
import faGem from '@fortawesome/fontawesome-free-solid/faGem';
// Parcerias
import faHandshake from '@fortawesome/fontawesome-free-solid/faHandshake';

import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';

import faDollarSign from '@fortawesome/fontawesome-free-solid/faDollarSign';

//import faLaptop from '@fortawesome/fontawesome-free-solid/faLaptop';

import faTasks from '@fortawesome/fontawesome-free-solid/faTasks';

import faRocket from '@fortawesome/fontawesome-free-solid/faRocket';

import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

import faSitemap from '@fortawesome/fontawesome-free-solid/faSitemap';

import faBoxOpen from '@fortawesome/fontawesome-free-solid/faBoxOpen';

import faBalanceScale from '@fortawesome/fontawesome-free-solid/faBalanceScale';




const CanvasAlt = props => {
    return (
        <div className="canvas">
            <div className="row top_row">
                <div className="col-lg col-xs-12"><DropArea className="full-height" source={props.value.parcerias_principais} icon={<FontAwesomeIcon icon={faHandshake} />}/></div>
                <div className="col-lg col-xs-12">
                    <div className="row default_row">
                        <div className="col col-xs-12"><DropArea className="half-height" source={props.value.atividades_principais} icon={<FontAwesomeIcon icon={faRocket} />} /></div>
                    </div>
                    <div className="row default_row">
                        <div className="col col-xs-12"><DropArea className="half-height" source={props.value.recursos_principais} icon={<FontAwesomeIcon icon={faBoxOpen} />} /></div>
                    </div>
                </div>
                <div className="col-lg col-xs-12"><DropArea className="full-height" source={props.value.proposta_de_valor} icon={<FontAwesomeIcon icon={faGem} />} /></div>
                <div className="col-lg col-xs-12">
                    <div className="row default_row">
                        <div className="col col-xs-12"><DropArea className="half-height" source={props.value.relacionamento_com_clientes} icon={<FontAwesomeIcon icon={faUsers} />} /></div>
                    </div>
                    <div className="row default_row">
                        <div className="col col-xs-12"><DropArea className="half-height" source={props.value.canais} icon={<FontAwesomeIcon icon={faPhone} />} /></div>
                    </div>
                </div>
                <div className="col-lg col-xs-12"><DropArea className="full-height" source={props.value.segmento_de_clientes} icon={<FontAwesomeIcon icon={faSitemap} />} /></div>
            </div>
            <div className="row bottom_row">
                <div className="col-lg col-xs-12"><DropArea className="half-height" source={props.value.estrutura_de_custos} icon={<FontAwesomeIcon icon={faBalanceScale} />} /></div>
                <div className="col-lg col-xs-12"><DropArea className="half-height" source={props.value.fontes_de_receita} icon={<FontAwesomeIcon icon={faDollarSign} />} /></div>
            </div>
        </div>
    );
};

CanvasAlt.propTypes = {
    value: PropTypes.object.isRequired
};

export default CanvasAlt;