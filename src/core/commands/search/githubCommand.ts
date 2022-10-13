import { CommandType } from "../../command";

const githubCommand: CommandType = {
  func: "github",
  name: "GitHub 搜索",
  desc: "使用Github搜索结果",
  alias: ["git"],
  params: [
    {
      key: "keyword",
      desc: "搜索内容",
      required: true,
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
  ],
  subCommand:{},
  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ? _[0] : "";
    const targetLink = `https://github.com/search?q=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default githubCommand;
