import { Fragment, useState } from 'react'

import { TextArea, PrimaryButton} from '../UI/'

import { addRating } from '../../utils/backend/product'
import NotificationEmitter from '../Notifications/NotificationEmitter'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Star = ({i, stars, clickAction}) => {
    return (
        <div className={classNames(i <= stars ? "text-yellow-500" : "text-gray-400", "hover:text-yellow-500 hover:cursor-pointer")} onClick={() => {clickAction(i)}}>
            <svg className={classNames(`w-5 h-5 fill-current`)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
        </div>
    );
}

const RatingStars = ({stars, setStars}) => {
    const clickAction = i => { setStars(i); console.log(i); }

    return (
        <div className="flex space-x-1">
            <Star i={1} stars={stars} clickAction={clickAction}/>
            <Star i={2} stars={stars} clickAction={clickAction}/>
            <Star i={3} stars={stars} clickAction={clickAction}/>
            <Star i={4} stars={stars} clickAction={clickAction}/>
            <Star i={5} stars={stars} clickAction={clickAction}/>
        </div>
    );
}

const CommentBox = ({productId}) => {
    const [stars, setStars] = useState(0);

    const { emitNotification } = NotificationEmitter();

    const sendRatingRequest = (event) => {
        event.preventDefault();

        var data = JSON.stringify({
            message: event.target.message.value,
            rate: event.target.rate.value
        })
        
        addRating(data, productId);
        
        emitNotification("success", "Adicionado uma nova classificação");
    }

    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src="http://localhost:8000/api/user/62850b5d676386ee80004849/picture"
                  alt=""
                />
            </div>
            <div className="min-w-0 flex-1">
                <form onSubmit={sendRatingRequest} className="relative">
                    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                        <label htmlFor="comment" className="sr-only">
                            Dê a sua opinião.
                        </label>
                        <TextArea rows={3}
                            name="message"
                            id="message"
                            placeholder="Dê a sua opinião."
                            defaultValue={''}/>
                        <input type="hidden" name="rate" value={stars}/>

                        {/* Spacer element to match the height of the toolbar */}
                        <div className="py-2" aria-hidden="true">
                            {/* Matches height of button in toolbar (1px border + 36px content height) */}
                            <div className="py-px">
                                <div className="h-9" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
                        <div>
                            <RatingStars stars={stars} setStars={setStars}/>
                        </div>
                        <div className="flex-shrink-0">
                            <PrimaryButton type="submit" text="Enviar"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CommentBox;