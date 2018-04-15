import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import DropArea from './DropArea';


const Canvas = props => {
    return (
        <Container fluid className="canvas h-100">
            <Row>
                <Col md="3">
                    <Row><DropArea className="full-height" source={props.value.parcerias_principais} /></Row>
                </Col>
                <Col md="2">
                    <Row><DropArea className="half-height" source={props.value.atividades_principais} /></Row>
                    <Row><DropArea className="half-height" source={props.value.recursos_principais} /></Row>
                </Col>
                <Col md="2" className="middle-col">
                    <Row><DropArea className="full-height" source={props.value.proposta_de_valor} /></Row>
                </Col>
                <Col md="2">
                    <Row><DropArea className="half-height" source={props.value.relacionamento_com_clientes} /></Row>
                    <Row><DropArea className="half-height" source={props.value.canais} /></Row>
                </Col>
                <Col md="3">
                    <Row><DropArea className="full-height" source={props.value.segmento_de_clientes} /></Row>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Row><DropArea className="half-height" source={props.value.estrutura_de_custos} /></Row>
                </Col>
                <Col md="6">
                    <Row><DropArea className="half-height" source={props.value.fontes_de_receita} /></Row>
                </Col>
            </Row>
        </Container>
    );
};

Canvas.propTypes = {
    value: PropTypes.object
};

export default Canvas;