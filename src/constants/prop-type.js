import PropTypes from "prop-types"
import { ROLE } from "../bff/constants/role"

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
    ROLE_ID,
    ROLE: PropTypes.shape({
        id: ROLE_ID,
        name: PropTypes.string.isRequired,
    }),
    ERROR: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.exact(null),
    ]),
    COMMENT: PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        publishedAt: PropTypes.string.isRequired,
    }),
    POST: PropTypes.shape({
        id: PropTypes.string.isRequired, 
        title: PropTypes.string.isRequire, 
        imageUrl: PropTypes.string.isRequire, 
        content: PropTypes.string.isRequire, 
        publishedAt: PropTypes.string.isRequire,
    }),
};
