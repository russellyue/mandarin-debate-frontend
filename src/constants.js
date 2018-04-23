const sectionTypeMap = {
    "陈词": 0,
    "盘问": 1,
    "自由辩论": 2,
    "总结": 3
}

const contestSequence = [
    {
        title: "正一立论",
        subtitle: "",
        duration: 240,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["陈词"],
    },
    {
        title: "反方盘问正一",
        subtitle: "四辩以外的反方任何一位辩手向正方一辩进行质询",
        duration: 120,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["盘问"]
    },
    {
        title: "反一立论",
        subtitle: "",
        duration: 240,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["陈词"]
    },
    {
        title: "正方盘问反一",
        subtitle: "四辩以外的正方任何一位辩手 向反方一辩进行质询",
        duration: 120,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["盘问"]
    },
    {
        title: "正二陈词",
        subtitle: "",
        duration: 180,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["陈词"]
    },
    {
        title: "反方盘问正二",
        subtitle: "四辩及已质询过对方之辩手以外的反方任何一位辩手向正方二辩进行质询",
        duration: 120,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["盘问"]
    },
    {
        title: "反二陈词",
        subtitle: "",
        duration: 180,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["陈词"]
    },
    {
        title: "正方盘问反二",
        subtitle: "四辩及已质询过对方之辩手以外的正方任何一位辩手向反方二辩进行质询",
        duration: 120,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["盘问"]
    },
    {
        title: "正三驳论",
        subtitle: "针对对方理论进行反驳，亦可继续申论",
        duration: 180,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["陈词"]
    },
    {
        title: "反方盘问正三",
        subtitle: "四辩及已质询过对方之辩手以外的反方任何一位辩手向正方三辩进行质询",
        duration: 120,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["盘问"]
    },
    {
        title: "反三驳论",
        subtitle: "针对对方理论进行反驳，亦可 继续申论",
        duration: 180,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["陈词"]
    },
    {
        title: "正方盘问反三",
        subtitle: "四辩及已质询过对方之辩手以外的正方任何一位辩手向反方三辩进行质询",
        duration: 120,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["盘问"]
    },
    {
        title: "正四 总结一",
        subtitle: "己方小结结束之后的剩余时间 为己方在总结环节内的可用时间",
        duration: 360,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["总结"]
    },
    {
        title: "反四 总结一",
        subtitle: "己方小结结束之后的剩余时间 为己方在总结环节内的可用时间",
        duration: 360,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["总结"]
    },
    {
        title: "自由辩论",
        subtitle: "",
        duration: 240,
        side: null,
        isTwoSide: true,
        type: sectionTypeMap["自由辩论"]
    },
    {
        title: "反四 总结二",
        subtitle: "己方小结结束之后的剩余时间 为己方在总结环节内的可用时间",
        duration: 360,
        side: false,
        isTwoSide: false,
        type: sectionTypeMap["总结"]
    },
    {
        title: "正四 总结二",
        subtitle: "己方小结结束之后的剩余时间 为己方在总结环节内的可用时间",
        duration: 360,
        side: true,
        isTwoSide: false,
        type: sectionTypeMap["总结"]
    }
];

export {
    contestSequence,
    sectionTypeMap
}