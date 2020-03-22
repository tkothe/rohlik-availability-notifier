FROM node

ADD ./package.json /
RUN ["npm", "install"]

ADD ./config.js / 
ADD ./rohlik.js /

CMD node rohlik.js

