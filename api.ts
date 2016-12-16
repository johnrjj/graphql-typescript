interface IVideo {
  id: string;
  title: string;
  duration: number;
  released: boolean;
};

const videoA: IVideo = {
  id: 'a',
  title: 'blah',
  duration: 120,
  released: true,
};

const videoB: IVideo = {
  id: 'b',
  title: 'meow',
  duration: 240,
  released: false,
};

const videos: Array<IVideo> = [videoA, videoB];

const getVideoById = (id): Promise<IVideo>  => new Promise((accept, reject)=> {
  const [video] = videos.filter(video => video.id === id);
  accept(video);
});

const getObjectById = (type: string, id: string) => {
  const types = {
    video: getVideoById,
  };
  return types[type](id);
};

const getVideos = (): Promise<Array<IVideo>> => new Promise((accept, reject) => accept(videos));

const createVideo = ({ title, duration, released }): IVideo => {
  const video: IVideo = {
    id: (new Buffer(title, 'utf8')).toString('base64'),
    title,
    duration,
    released,
  };
  videos.push(video);
  return video; 
};

export {
  getObjectById,
  getVideoById,
  getVideos,
  createVideo,
};