const styled = require('styled-components');

export const getStyledComponent = template => {
  const styledComponent = {};

  Object.keys(template).forEach(key => {
    const { tag } = template[key];
    styledComponent[key] = styled[tag]`
      ${props => props.styledProps(props)[key]}
    `;
  });

  return styledComponent;
};
