import { CommandType } from "../../command";

/**
 * 百度搜索命令
 * @author yupi
 */
const baiduCommand: CommandType = {
  func: "baidu",
  name: "百度搜索",
  desc:"使用百度搜索结果",
  alias:["bd"],
  params: [
    {
      key: "keyword",
      desc: "搜索内容",
    },
  ],
  options: [
    {
      key: "self",
      desc: "是否当前页面打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
    {
      key: "picture",
      desc: "是否搜索图片",
      alias: ["p"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  subCommand:{},
  action(options, terminal) {
    console.log("search")
    const { _, self, picture } = options;
    const word = _.length > 0 ? _[0] : "";
    let targetLink = `https://www.baidu.com/s?wd=${word}`;
    // 搜索图片
    if (picture) {
      targetLink = `https://image.baidu.com/search/index?tn=baiduimage&word=${word}`;
    }
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default baiduCommand;
