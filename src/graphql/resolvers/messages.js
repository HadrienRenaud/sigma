/**
 * @file Resolvers pour tous les types de messages. hawkspar->akka ; bien, mais pas suffisant
 * @author akka
 */

const MessageResolvers = {
    Message: {
        __resolveType: function(obj) {
            if (obj.location) {
                return "Event";
            }
            if (obj.views) {
                return "Announcement";
            }
            if (obj.for_question) {
                return "Answer";
            }
            if (obj.for_answer) {
                return "Question";
            }
            return "PrivatePost";
        }
    },
};

export default MessageResolvers;