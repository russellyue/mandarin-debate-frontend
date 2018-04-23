import cookie from 'react-cookies';
import { contestSequence, sectionTypeMap } from '../constants';
import { Modal } from 'antd';
import notify from '../utils/notify';
export default {
    namespace: 'contest',
    state: {
        tournament: {
            name: "媒体杯",
            subtitle: "决赛"
        },
        proposition: "多媒体大学赛城院校",
        opposition: "多媒体大学马六甲院校",
        title: "时势造英雄/英雄造时势",
        timer: 0,
        section: {
            number: 0,
            title: null,
            subtitle: null
        },
        qiXiBeforeGoToNextSection: true,
        isQiXiAvaiable: true,
        qiXi: [
            {
                title: "陈词",
                availability: true,
                duration: 120
            },
            {
                title: "盘问",
                availability: true,
                duration: 120
            }
        ],
        isStart: false,
        isSectionStart: false,
        isSectionEnd: false,
        timerId: null,
        isZiYouBian: false,
        ziYouBianRemainTime: {
            proposition: 240,
            opposition: 240
        },
        zongJieRemainTime: {
            proposition: 360,
            opposition: 360
        },
        ziYouBianSide: null,
        showComponent: {
            goToModal: false,
            editModal: false,
            qiXiModal: false
        },
        buttonDisabled: {
            qiXi: true,
            nextSection: true,
            startSection: true,
            goToSection: true,
            pauseSection: false,
            ziYouBianLeft: false,
            ziYouBianRight: true,
            zongJieStop: true
        },
    },
    reducers: {
        saveStartGame(state, { payload: { isStart, section, timer, buttonDisabled } }) {
            return { ...state, isStart, section, timer, buttonDisabled };
        },
        saveStartSection(state, { payload: { isSectionStart, buttonDisabled } }) {
            return { ...state, isSectionStart }
        },
        savePauseSection(state, { payload: { isSectionStart, buttonDisabled } }) {
            return { ...state, isSectionStart, buttonDisabled }
        },
        saveZiYouBian(state, { payload: { isZiYouBian, ziYouBianRemainTime, section, isSectionStart, timer, ziYouBianSide } }) {
            return { ...state, isZiYouBian, ziYouBianRemainTime, section, isSectionStart, timer, ziYouBianSide };
        },
        saveSectionEnd(state, { payload: { buttonDisabled, isSectionStart, isSectionEnd, timer } }) {
            return { ...state, buttonDisabled, isSectionStart, isSectionEnd }
        },
        saveNextSection(state, { payload: { section, isSectionStart, timer, buttonDisabled, isZiYouBian, isSectionEnd } }) {
            return { ...state, section, isSectionStart, timer, buttonDisabled, isZiYouBian, isSectionEnd };
        },
        saveTimer(state, { payload: { timer } }) {
            return { ...state, timer };
        },
        saveTimerId(state, { payload: { timerId } }) {
            return { ...state, timerId };
        },
        saveShowComponent(state, { payload: showComponent }) {
            return { ...state, showComponent };
        },
        saveStartZiYouBian(state, { payload: { ziYouBianRemainTime, timer, ziYouBianSide, section, isSectionStart, buttonDisabled } }) {
            return { ...state, ziYouBianRemainTime, timer, ziYouBianSide, section, isSectionStart, buttonDisabled };
        },
        saveStopZongJie(state, { payload: { zongJieRemainTime, buttonDisabled } }) {
            return { ...state, zongJieRemainTime, buttonDisabled }
        },
        saveStaticContent(state, { payload: { tournament, proposition, opposition, title } }) {
            return { ...state, tournament, proposition, opposition, title }
        },
        saveStartQiXi(state, { payload: { section, qiXi, timer, buttonDisabled, qiXiBeforeGoToNextSection } }) {
            return { ...state, section, qiXi, timer, buttonDisabled, qiXiBeforeGoToNextSection }
        }
    },
    effects: {
        *startGame({ payload }, { put, select }) {
            const timer = contestSequence[0].duration;
            const buttonDisabled = yield select(state => state.contest.buttonDisabled);
            buttonDisabled.startSection = false;
            buttonDisabled.goToSection = false;
            const section = {
                ...contestSequence[0],
                number: 0
            }
            const isStart = true;
            yield put({ type: 'saveStartGame', payload: { isStart, section, timer, buttonDisabled } });
        },

        // save setInterval Id
        *setTimerId({ payload: timerId }, { put }) {
            yield put({ type: 'saveTimerId', payload: { timerId } });
        },

        *startSection({ payload }, { put, select }) {
            const isSectionStart = true;
            const { buttonDisabled, section } = yield select(state => state.contest);
            buttonDisabled.goToSection = true;
            buttonDisabled.qiXi = true;
            if (section.type === sectionTypeMap["总结"]) {
                buttonDisabled.zongJieStop = false;
            }
            yield put({ type: 'saveStartSection', payload: { isSectionStart, buttonDisabled } });
        },

        *pauseSection({ payload }, { put, select }) {
            const isSectionStart = false;
            let { buttonDisabled } = yield select(state => state.contest);
            buttonDisabled.goToSection = false;
            yield put({ type: 'clearTimerId' });
            yield put({ type: 'savePauseSection', payload: { isSectionStart, buttonDisabled } });
        },

        *timerMinus({ payload }, { put, select, call }) {
            let { timer, isZiYouBian, ziYouBianRemainTime, ziYouBianSide, section, buttonDisabled } = yield select(state => state.contest);
            if (timer === 30) {
                notify();
                if (section.title === "正四 总结一" || section.title === "反四 总结一") {
                    setTimeout(() => { notify() }, 1200)
                }
            }
            if ((section.title === "正四 总结一" || section.title === "反四 总结一") && timer % 60 === 0 && timer !== 0 && timer !== 360) {
                notify();
            }
            if (timer === 0) {
                notify();
                setTimeout(() => { notify() }, 1200)
                if (section.title === "正四 总结一" || section.title === "反四 总结一") {
                    setTimeout(() => { notify() }, 2400)
                }
                // ziyoubian section
                if (isZiYouBian) {
                    buttonDisabled.ziYouBianLeft = true;
                    buttonDisabled.ziYouBianRight = true;
                    let remainTime;
                    if (ziYouBianSide) {
                        ziYouBianRemainTime.proposition = 0;   // if it's left side
                        section.title = "反方";
                        remainTime = ziYouBianRemainTime.opposition;
                    } else {
                        ziYouBianRemainTime.opposition = 0;    // if it's right side
                        section.title = "正方";
                        remainTime = ziYouBianRemainTime.proposition;
                    }
                    timer = remainTime;
                    if (remainTime !== 0) {
                        ziYouBianSide = !ziYouBianSide;
                        const parasPassToSaveStartZiYouBian = {
                            ziYouBianRemainTime,
                            timer,
                            ziYouBianSide,
                            section,
                            isSectionStart: true,
                            buttonDisabled
                        }
                        yield put({ type: 'saveStartZiYouBian', payload: { ...parasPassToSaveStartZiYouBian } });
                    } else {
                        yield put({ type: 'clearTimerId' });
                        yield put({ type: 'sectionEnd' });
                    }
                } else {
                    yield put({ type: 'clearTimerId' });
                    yield put({ type: 'sectionEnd' });
                }

                if (section.number === 16) {
                    Modal.success({
                        title: '恭喜你完成比赛',
                        content: '欢迎下次使用！',
                    });
                }

            } else {
                yield put({ type: 'saveTimer', payload: { timer: timer - 1 } });
            }

        },

        *sectionEnd({ payload }, { select, put }) {
            let { buttonDisabled, section, timer, isSectionEnd, qiXiBeforeGoToNextSection } = yield select(state => state.contest);
            //  future work --- qixi => false when meet some condition 
            if (section.number > 2 && section.number < 14) {
                buttonDisabled.qiXi = false;
            } else {
                buttonDisabled.qiXi = true;
            }

            buttonDisabled.startSection = true;
            buttonDisabled.nextSection = false;
            buttonDisabled.goToSection = false;

            isSectionEnd = true;
            const isSectionStart = false;
            yield put({ type: 'saveSectionEnd', payload: { buttonDisabled, isSectionStart, isSectionEnd, timer } });
            if (section.title === "反方奇袭" || section.title === "正方奇袭") {
                if (qiXiBeforeGoToNextSection) {
                    yield put({ type: 'goToSection', payload: section.number + 1 })
                } else {
                    yield put({ type: 'goToSection', payload: section.number })
                }
            }
        },

        *stopZongJie({ payload }, { select, put }) {
            const { section, zongJieRemainTime, timer, buttonDisabled } = yield select(state => state.contest);
            section.side ? zongJieRemainTime.proposition = timer : zongJieRemainTime.opposition = timer;
            buttonDisabled.zongJieStop = true;
            yield put({ type: 'clearTimerId' });
            yield put({ type: 'sectionEnd' });
            yield put({ type: 'saveStopZongJie', payload: { zongJieRemainTime, buttonDisabled } })
        },

        *nextSection({ payload }, { put, select }) {
            let { section, buttonDisabled, zongJieRemainTime } = yield select(state => state.contest);

            const newSectionNumber = section.number + 1;

            const isSectionEnd = false;
            section = {
                ...contestSequence[newSectionNumber],
                number: newSectionNumber,
            };


            buttonDisabled.nextSection = true;
            buttonDisabled.startSection = false;
            buttonDisabled.startSection = section.isTwoSide ? true : false;

            if (section.number > 3 && section.number < 14) {
                buttonDisabled.qiXi = false;
            } else {
                buttonDisabled.qiXi = true;
            }

            const isSectionStart = false;
            let timer = section.duration;

            if (section.type === sectionTypeMap["总结"]) {
                timer = section.side ? zongJieRemainTime.proposition : zongJieRemainTime.opposition;
            }

            if (section.type === sectionTypeMap["自由辩论"]) {
                const paraPassToSaveZiYouBian = {
                    isZiYouBian: true,
                    ziYouBianRemainTime: {
                        proposition: section.duration,
                        opposition: section.duration
                    },
                    section,
                    isSectionStart,
                    timer,
                    ziYouBianSide: true,
                    isSectionEnd
                }
                yield put({ type: 'saveZiYouBian', payload: { ...paraPassToSaveZiYouBian } });
            } else {
                const paraPassToSaveNextSection = {
                    section,
                    isSectionStart,
                    timer,
                    buttonDisabled,
                    isZiYouBian: false,
                    isSectionEnd
                }
                yield put({ type: 'saveNextSection', payload: { ...paraPassToSaveNextSection } });
            }

        },

        *goToSection({ payload: sectionNumber }, { put, select }) {
            let { buttonDisabled, zongJieRemainTime } = yield select(state => state.contest);
            const newSectionNumber = sectionNumber;
            const section = {
                ...contestSequence[newSectionNumber],
                number: newSectionNumber,
            };
            let timer = section.duration;
            const isSectionStart = false;
            const isSectionEnd = false;

            buttonDisabled.nextSection = true;

            if (section.type === sectionTypeMap["总结"]) {
                timer = section.side ? zongJieRemainTime.proposition : zongJieRemainTime.opposition;
            }

            if (section.number > 3 && section.number < 14) {
                buttonDisabled.qiXi = false;
            } else {
                buttonDisabled.qiXi = true;
            }

            buttonDisabled.startSection = section.isTwoSide ? true : false;

            if (section.type === sectionTypeMap["自由辩论"]) {
                const paraPassToSaveZiYouBian = {
                    isZiYouBian: true,
                    ziYouBianRemainTime: {
                        proposition: section.duration,
                        opposition: section.duration
                    },
                    section,
                    isSectionStart,
                    timer,
                    ziYouBianSide: true,
                    isSectionEnd
                }
                yield put({ type: 'saveZiYouBian', payload: { ...paraPassToSaveZiYouBian } });
            } else {
                const paraPassToSaveNextSection = {
                    section,
                    isSectionStart,
                    timer,
                    buttonDisabled,
                    isZiYouBian: false,
                    isSectionEnd
                }
                yield put({ type: 'saveNextSection', payload: { ...paraPassToSaveNextSection } });
            }
            yield put({ type: 'hideGoToModal' });
        },

        *startZiYouBian({ payload: ziYouBianSide }, { put, select }) {
            let { timer, ziYouBianRemainTime, section, isSectionStart, buttonDisabled } = yield select(state => state.contest);
            if (ziYouBianSide) {
                ziYouBianRemainTime.opposition = timer;
                yield put({ type: 'clearTimerId' });
                timer = ziYouBianRemainTime.proposition;
                section.title = "正方";
                buttonDisabled.ziYouBianLeft = true;
                buttonDisabled.ziYouBianRight = false;
            } else {
                ziYouBianRemainTime.proposition = timer;
                yield put({ type: 'clearTimerId' });
                timer = ziYouBianRemainTime.opposition;
                section.title = "反方";
                buttonDisabled.ziYouBianLeft = false;
                buttonDisabled.ziYouBianRight = true;
            }
            buttonDisabled.goToSection = true;
            section.subtitle = "剩余时间";
            isSectionStart = true;
            const parasPassToSaveStartZiYouBian = {
                ziYouBianRemainTime,
                timer,
                ziYouBianSide,
                section,
                isSectionStart,
                buttonDisabled
            }
            yield put({ type: 'saveStartZiYouBian', payload: { ...parasPassToSaveStartZiYouBian } });
        },

        *hideGoToModal({ payload }, { put, select }) {
            let { showComponent } = yield select(state => state.contest);
            showComponent.goToModal = false;
            yield put({ type: 'saveShowComponent', payload: showComponent });
        },

        *showGoToModal({ payload }, { put, select }) {
            let { showComponent } = yield select(state => state.contest);
            showComponent.goToModal = true;
            yield put({ type: 'saveShowComponent', payload: showComponent });
        },

        *showEditModal({ payload }, { put, select }) {
            let { showComponent } = yield select(state => state.contest);
            showComponent.editModal = true;
            yield put({ type: 'saveShowComponent', payload: showComponent });
        },

        *hideEditModal({ payload }, { put, select }) {
            let { showComponent } = yield select(state => state.contest);
            showComponent.editModal = false;
            yield put({ type: 'saveShowComponent', payload: showComponent });
        },

        *setTimer({ payload: timer }, { put }) {
            yield put({ type: 'saveTimer', payload: { timer } });
        },

        *clearTimerId({ payload }, { put, select }) {
            const timerId = yield select(state => state.contest.timerId);
            clearInterval(timerId);
            yield put({ type: 'saveTimerId', payload: { timerId: null } });
        },
        *setStaticContent({ payload: { tournament, proposition, opposition, title } }, { put, select }) {
            yield put({ type: 'saveStaticContent', payload: { tournament, proposition, opposition, title } });
            yield put({ type: 'hideEditModal' });
        },

        *startQiXi({ payload: { side, choice, } }, { put, select }) {
            let { section, qiXi, buttonDisabled, timer } = yield select(state => state.contest);
            buttonDisabled.startSection = true;
            section.title = side ? "正方奇袭" : "反方奇袭";
            section.subtitle = qiXi[choice].title;
            let qiXiBeforeGoToNextSection = false;
            if (timer === 0 || (section.number === 12 || section.number === 13 && timer < 360)) {
                qiXiBeforeGoToNextSection = true;
            }
            timer = qiXi[choice].duration;
            buttonDisabled.startSection = false;
            yield put({ type: 'saveStartQiXi', payload: { section, qiXi, timer, buttonDisabled, qiXiBeforeGoToNextSection } });
            yield put({ type: 'hideQiXiModal' });
        },
        *showQiXiModal({ payload }, { put, select }) {
            let { showComponent } = yield select(state => state.contest);
            showComponent.qiXiModal = true;
            yield put({ type: 'saveShowComponent', payload: showComponent });
        },
        *hideQiXiModal({ payload }, { put, select }) {
            let { showComponent } = yield select(state => state.contest);
            showComponent.qiXiModal = false;
            yield put({ type: 'saveShowComponent', payload: showComponent });
        },

        // future work
        // *newGame({ payload }, { put, select }) {
        //     let {isStart,section,isSectionStart} = yield select(state=>state.contest);
        //     yield put({ type: 'saveNewGame' });
        // },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            window.onbeforeunload = function () {
                return "你确定要离开页面吗？";
            };
            const staticContent = cookie.load('staticContent');
            if (staticContent !== undefined) {
                dispatch({ type: 'setStaticContent', payload: { ...staticContent } });
            }
        },
    },
};
