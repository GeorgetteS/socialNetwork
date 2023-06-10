import { DataTypes, BOOLEAN } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: BOOLEAN,
      defaultValue: false,
    },
    activationLink: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  },
);

const Chat = sequelize.define(
  'Chat',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'chats',
    timestamps: true,
  },
);

const UserChat = sequelize.define(
  'UserChat',
  {
    role: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'participant',
    },
  },
  {
    tableName: 'users_chats',
    timestamps: true,
    validate: {
      async checkUsersExist() {
        if (!this.UserId || !this.ChatId) {
          throw new Error('UserId and ChatId are required.');
        }
        const [user, chat] = await Promise.all([
          User.findByPk(this.UserId),
          Chat.findByPk(this.ChatId),
        ]);
        if (!user || !chat) {
          throw new Error('Both UserId and ChatId must refer to existing records.');
        }
      },
    },
  },
);

const Message = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'messages',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
);

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    text: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'posts',
    timestamps: true,
  },
);

const PostComment = sequelize.define(
  'PostComment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'post_comments',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
);

const PostLike = sequelize.define(
  'PostLike',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: 'post_likes',
    timestamps: true,
  },
);

const PostImage = sequelize.define(
  'PostImage',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'post_images',
    timestamps: true,
  },
);

const Friend = sequelize.define(
  'Friend',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING(30),
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
    // friendId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
  },
  {
    tableName: 'friends',
    timestamps: true,
  },
);

const Token = sequelize.define(
  'Token',
  {
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tokens',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
);

User.hasOne(Token);
Token.belongsTo(User);

Chat.belongsToMany(User, { through: UserChat });
User.belongsToMany(Chat, { through: UserChat });

User.hasOne(Message);
Message.belongsTo(Message);

Chat.hasOne(Message);
Message.belongsTo(Chat);

User.belongsToMany(User, { through: Friend, as: 'friends', foreignKey: 'userId' });

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(PostImage);
PostImage.belongsTo(Post);

Post.hasMany(PostComment);
PostComment.belongsTo(Post);

User.hasMany(PostComment);
PostComment.hasOne(User);

User.belongsToMany(Post, { through: PostLike, as: 'liked_posts' });
Post.belongsToMany(User, { through: PostLike, as: 'liked_by_users' });

export { UserChat, Chat, Message, Post, Token, User, PostComment, PostImage, PostLike };
