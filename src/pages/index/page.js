import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm, message, Modal, List } from 'antd';
import moment from 'moment';
import styles from './index.less';

import StaticComponent from './components/StaticComponent';

import { contestSequence, sectionTypeMap } from '../../constants';

function IndexPage({ dispatch, tournament, proposition, opposition, title, timer, sectionNumber, isStart, timerId, isSectionStart, isSectionEnd, isZiYouBian, isShowGoToModal, buttonDisabled, section, ziYouBianSide, showComponent }) {

  // const sectionContent = contestSequence[sectionNumber];
  const propsToStaticComponent = { dispatch, tournament, proposition, opposition, title, showComponent };

  // function to call when press start button
  function startGame() {
    dispatch({
      type: 'contest/startGame',
    });
    const text = `${tournament.name} ${tournament.subtitle} 正式开始`;
    message.success(text);
  }

  function startSection() {
    // set timerId
    dispatch({
      type: 'contest/startSection',
      payload: true
    });

    const timerId = setInterval(
      () => {
        dispatch({
          type: 'contest/timerMinus',
        });
      },
      1000
    )
    // save timerId to redux
    dispatch({
      type: 'contest/setTimerId',
      payload: timerId
    });
  }

  function pasuseSection() {
    dispatch({
      type: 'contest/pauseSection',
    });
  }

  function nextSection() {
    dispatch({
      type: 'contest/nextSection',
    });
  }

  function showGoToModal() {
    dispatch({
      type: 'contest/showGoToModal',
    });
  }

  function hideGoToModal() {
    dispatch({
      type: 'contest/hideGoToModal',
    });
  }

  function goToSection(sectionNumber) {
    dispatch({
      type: 'contest/goToSection',
      payload: sectionNumber
    });
  }

  function startZiYouBian(ziYouBianSide) {
    dispatch({
      type: 'contest/startZiYouBian',
      payload: ziYouBianSide
    });

    const timerId = setInterval(
      () => {
        dispatch({
          type: 'contest/timerMinus',
        });
      },
      1000
    )
    // save timerId to redux
    dispatch({
      type: 'contest/setTimerId',
      payload: timerId
    });
  }

  function stopZongJie() {
    dispatch({
      type: 'contest/stopZongJie',
    });
  }

  const buttonColConfig = {
    xs: {
      span: 8
    },
    sm: {
      span: 8
    }
  }

  const timerColConfig = {
    xs: {
      span: 8
    },
    sm: {
      span: 8
    }
  }

  const sectionColConfig = {
    xs: {
      span: 8
    },
    sm: {
      span: 8
    }
  }

  const sectionComponent = isStart ? (
    <Row className={styles.section}>
      <Col {...sectionColConfig} >
        {section.isTwoSide ?
          (<Button disabled={buttonDisabled.ziYouBianLeft} type="primary" shape="circle" icon="right" onClick={() => { startZiYouBian(true) }} />) : null
        }
      </Col>
      <Col {...sectionColConfig} className={styles.section}>
        <div className={styles.title}>
          {section.title}
        </div>
        <div className={styles.subtitle}>
          {section.subtitle}
        </div>
      </Col>
      <Col {...sectionColConfig} >
        {section.isTwoSide ?
          (<Button disabled={buttonDisabled.ziYouBianRight} type="primary" shape="circle" icon="right" onClick={() => { startZiYouBian(false) }} />) : null
        }
      </Col>
    </Row>
  ) : (
      <div className={styles.section}>
        <div className={styles.startButton}>
          <Popconfirm title="确定要开始比赛吗" onConfirm={() => { startGame() }} okText="确认" cancelText="取消">
            <Button type="primary" shape="circle" >
              开始
          </Button>
          </Popconfirm>
        </div>
      </div>
    )

  return (
    <div className={styles.index}>
      <StaticComponent {...propsToStaticComponent} />
      {sectionComponent}

      <Row className={styles.timer}>
        <Col {...timerColConfig}>
          <Button disabled={buttonDisabled.qixi} type="primary" shape="circle" >
            奇袭
          </Button>
        </Col>
        <Col {...timerColConfig}>
          {moment.utc(timer * 1000).format("m:ss")}
        </Col><Col {...timerColConfig}>
          <Button disabled={buttonDisabled.qixi} type="primary" shape="circle" >
            奇袭
          </Button>
        </Col>
      </Row>

      <Row className={styles.buttons}>
        <Col {...buttonColConfig}>
          <Button disabled={buttonDisabled.nextSection} type="primary" shape="circle" icon="step-forward" onClick={() => { nextSection() }} />
        </Col>
        {isSectionStart ?
          (<Col {...buttonColConfig}>
            <Popconfirm title="你确定要暂停吗？" onConfirm={() => { pasuseSection() }} okText="确定" cancelText="取消">
              <Button disabled={buttonDisabled.pasuseSection} type="primary" shape="circle" icon="pause" />
            </Popconfirm>
          </Col>) :
          (<Col {...buttonColConfig}>
            <Button disabled={buttonDisabled.startSection} type="primary" shape="circle" icon="caret-right" onClick={() => { startSection() }} />
          </Col>)
        }
        <Col {...buttonColConfig}>
          <Button disabled={buttonDisabled.goToSection} type="primary" shape="circle" icon="fast-forward" onClick={() => { showGoToModal() }} />
          <Modal
            title="选择一个节点"
            visible={showComponent.goToModal}
            onOk={() => { hideGoToModal() }}
            width={300}
            onCancel={() => { hideGoToModal() }}
          >
            <List
              size="small"
              header={null}
              footer={null}
              bordered
              dataSource={contestSequence}
              renderItem={(item, index) => (
                <List.Item>
                  <Popconfirm title={`确定要去${item.title}`} onConfirm={() => { goToSection(index) }} okText="Yes" cancelText="No">
                    <a >{item.title}</a>
                  </Popconfirm>
                </List.Item>
              )
              }
            />
          </Modal>
        </Col>
      </Row>
      {
        (section.type === sectionTypeMap["总结"] && section.number !== contestSequence.length - 1 && section.number !== contestSequence.length - 2) ?
          <div className={styles.zongJieButton}>
            <Button disabled={buttonDisabled.zongJieStop} type="primary" shape="circle" icon="minus" onClick={() => { stopZongJie() }} />
          </div> : null
      }
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps(state) {
  const { tournament, proposition, opposition, title, timer, sectionNumber, isStart, timerId, isSectionStart, isSectionEnd, isZiYouBian, isShowGoToModal, buttonDisabled, section, ziYouBianSide, showComponent } = state.contest;
  return {
    tournament,
    proposition,
    opposition,
    title,
    timer,
    sectionNumber,
    isStart,
    timerId,
    isSectionStart,
    isSectionEnd,
    isZiYouBian,
    isShowGoToModal,
    buttonDisabled,
    section,
    ziYouBianSide,
    showComponent,
    loading: state.loading.models.contest,
  };
}

export default connect(mapStateToProps)(IndexPage);
