import React from 'react';
import { Row, Col, Button, Modal } from 'antd';
import StaticForm from './StaticForm';
import styles from './StaticComponent.less';


function StaticComponent({ dispatch, tournament, proposition, opposition, title, showComponent }) {

    const propsToForm = { dispatch, tournament, proposition, opposition, title };
    function showEditModal() {
        dispatch({
            type: 'contest/showEditModal',
        });
    }

    function hideEditModal() {
        dispatch({
            type: 'contest/hideEditModal',
        });
    }


    const settingsColConfig = {
        xs: {
            span: 12
        },
        sm: {
            span: 12
        }
    }
    const competitorColConfig = {
        xs: {
            span: 10
        },
        sm: {
            span: 10
        }
    }
    const vsColConfig = {
        xs: {
            span: 4
        },
        sm: {
            span: 4
        }
    }

    return (
        <div className={styles.staticComponent}>
            {/* new game and edit game buttons */}
            <Row className={styles.settings}>
                <Col {...settingsColConfig} className={styles.newMatch}>
                    {/* <Button type="primary"  >
                        新比赛
                    </Button> */}{null}
                </Col>
                <Col {...settingsColConfig} className={styles.edit}>
                    <Button type="primary" onClick={() => { showEditModal() }}  >
                        编辑比赛内容
                    </Button>
                </Col>
            </Row>
            <Modal
                title="编辑比赛内容"
                visible={showComponent.editModal}
                onOk={() => { hideEditModal() }}
                onCancel={() => { hideEditModal() }}
            >
                <StaticForm {...propsToForm} />
            </Modal>
            {/* tournament infomations */}
            <div className={styles.tournament}>
                <div className={styles.name}>
                    {tournament.name}
                </div>
                <div className={styles.subtitle}>
                    {tournament.subtitle}
                </div>
            </div>

            <div className={styles.title}>
                {title}
            </div>

            {/* competitors' information */}
            <Row className={styles.competitors}>
                <Col {...competitorColConfig} className={styles.competitor}>
                    <div className={styles.name}>
                        {proposition}
                    </div>
                </Col>
                <Col {...vsColConfig} className={styles.vs}>
                    <i className="iconfont icon-duibivs"></i>
                </Col>
                <Col {...competitorColConfig} className={styles.competitor}>
                    <div className={styles.name}>
                        {opposition}
                    </div>
                </Col>
            </Row>

        </div>
    );
}

export default StaticComponent;
